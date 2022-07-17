class DancingRuneWeapon extends Ability {
    constructor() {
        let name = "Dancing Rune Weapon"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.petData = {
            name:"Dancing Rune Weapon",
            abilities:{},
            color:"#324f56",
            size:4,
            do:[{name:"goMelee"}],
            autoAttackDamage:1.5
        }
        this.petDuration = 8
        this.duration = 8
        this.effect = [{name:"increaseStat",stat:"dodge",val:40}]
    }

    getTooltip() {
            return "Summons a rune weapon for 8 sec that mirrors your melee attacks and bolsters your defenses.<br>" +
                "<br>" +
                "While active, you gain 40% parry chance."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this)
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

}