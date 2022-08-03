class SummonInfernal extends Ability {
    constructor() {
        let name = "Summon Infernal"
        let cost = 2
        let gcd = 1.5
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 1.2
        this.petData = {
            name:"Infernal",
            abilities:{"Immolation Aura":new ImmolationAuraInfernal(),"Infernal":new ImpactInfernal()},
            color:"rgba(57,185,0,0.84)",
            size:10,
            do:[{name:"goMelee",},{name:"cast",ability:"Immolation Aura"},{name:"cast",ability:"Infernal"}],
            autoAttackDamage:0.85
        }
        this.petDuration = 30
        this.petId = false
        this.duration = 30
        this.castPosition = {x:0,y:0}
    }

    getTooltip() {
        return "Summons an Infernal from the Twisting Nether, impacting for "+spellPowerToNumber(this.spellPower)+" Fire damage and stunning all enemies in the area for 2 sec.<br>" +
            "<br>" +
            "The Infernal will serve you for 30 sec, dealing "+spellPowerToNumber(0.55)+" damage to all nearby enemies every 2 sec and generating 1 Soul Shard Fragment every 0.5 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            if (caster.pets[this.petId]!==undefined) {
                if (caster.pets[this.petId] && caster.pets[this.petId].name==="Infernal") {
                    caster.pets[this.petId] = undefined
                }
            }

            if (caster===player) {
                this.castPosition.x = mousePosition2d.x
                this.castPosition.y = mousePosition2d.y
            } else {
                this.castPosition.x = caster.mousePos.x
                this.castPosition.y = caster.mousePos.y
            }

            this.petId = spawnPet(caster,"guardian",this.petData.name,this.castPosition.x,this.castPosition.y,this)


            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    runBuff(caster, buff, id) {

    }

}

//
class ImmolationAuraInfernal extends Ability {
    constructor() {
        let name = "Immolation Aura"
        let cost = 0
        let gcd = 2
        let castTime = 0
        let cd = 2
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.55

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],8,true))  {
                    doDamage(caster,enemies[i],this)
                }
            }
            caster.caster.useEnergy(0,-0.4)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}
//
class ImpactInfernal extends Ability {
    constructor() {
        let name = "Infernal"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 8
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 1.2

    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],8,true))  {
                    doDamage(caster,enemies[i],this)
                }
            }
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}


