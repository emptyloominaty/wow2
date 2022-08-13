class Apocalypse extends Ability {
    constructor() {
        let name = "Apocalypse"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.5
        this.secCost = -2
        this.petData = {
            name:"Apocalypse",
            abilities:{"Claw":new Claw()},
            color:"#563e38",
            size:3,
            do:[{name:"goMelee"},{name:"cast",ability:"Claw"}],
            autoAttackDamage:1
        }
        this.petDuration = 15
    }

    getTooltip() {
        return "Bring doom upon the enemy, dealing "+spellPowerToNumber(this.spellPower)+" Shadow damage and bursting up to 4 Festering Wounds on the target. " +
            "Summons an Army of the Dead ghoul for 15 sec for each burst Festering Wound." +
            "<br><br>" +
            "Generates 2 Runes."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken reduced by 30%.<br>" +
            "Immune to Stun effects."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                doDamage(caster, caster.castTarget, this)

                this.i = 0
                for (let i = 0; i<4; i++) {
                    if (checkDebuffStacks(caster,caster.castTarget,"Festering Wound")) {
                        caster.abilities["Festering Wound"].burst(caster,caster.castTarget)
                        spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this,true)
                        this.i++
                    }
                }

                this.setCd()
                this.setGcd(caster)
                caster.useEnergy(this.cost, this.secCost)
                return true
            }
        }
        return false
    }
}
