class InvokeNiuzaotheBlackOx extends Ability {
    constructor() {
        let name = "Invoke Niuzao, the Black Ox"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 25
        this.petData = {
            name:"Niuzao",
            abilities:{"Stomp ":new StompNiuzao()},
            color:"#ffeca4",
            size:7,
            do:[{name:"goMelee"},{name:"cast",ability:"Stomp "}],
        }
        this.petDuration = 25
        this.health = 0
    }

    getTooltip() {
        return "Summons an effigy of Niuzao, the Black Ox for 25 sec." +
            " Niuzao attacks your primary target, and frequently Stomps, damaging all nearby enemies for (16.38% of Attack power)" +
            " plus 25% of Stagger damage you have recently purified While active, 25% of damage delayed by Stagger is instead Staggered by Niuzao."
    }

    getBuffTooltip(caster, target, buff) {
        return "Niuzao is staggering 25% of the Monk's Stagger damage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this)
            applyBuff(caster,caster,this)
            this.health = caster.maxHealth
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
//----------------------------------------------
class StompNiuzao extends Ability {
    constructor() {
        let name = "Stomp "
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 5
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 8
        super(name, cost, gcd, castTime, cd, channeling, casting, canMove, school, range, charges)
        this.spellPower = 0.1638
    }
    startCast(caster) {
        if (this.checkStart(caster)) {
            let damage = (caster.stats.primary * this.spellPower) * (1 + (caster.stats.vers / 100))
            damage = damage + (caster.caster.abilities["Purifying Brew"].purifiedStagger*0.25)
            caster.caster.abilities["Purifying Brew"].purifiedStagger = 0

            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],undefined,true)) {
                    doDamage(caster,enemies[i],this,undefined,undefined,undefined,undefined,undefined,undefined,damage)
                }
            }

            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setCd()
            this.setGcd(caster)
            return true
        }
        return false
    }
}
//----------------------------------------------
