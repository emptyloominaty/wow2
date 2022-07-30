class BlackPowder extends Ability {
    constructor() {
        let name = "Black Powder"
        let cost = 35
        let gcd = 1
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "physical"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.08*1.21
        this.secCost = "all"

    }

    getTooltip() {
        let spellPower = ((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100)))
        return  "Finishing move that launches explosive Black Powder at all nearby enemies dealing Physical damage." +
            "All nearby targets with your Find Weakness suffer an additional 40% damage as Shadow" +
            "<br>" +
            "<br>1 point: "+(spellPower).toFixed(0)+"  damage " +
            "<br>2 points: "+(spellPower*2).toFixed(0)+"  damage " +
            "<br>3 points: "+(spellPower*3).toFixed(0)+"  damage " +
            "<br>4 points: "+(spellPower*4).toFixed(0)+"  damage " +
            "<br>5 points: "+(spellPower*5).toFixed(0)+"  damage "
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],undefined,true) ) {
                    doDamage(caster, enemies[i], this,undefined,this.spellPower*caster.secondaryResource)
                    if (checkDebuff(caster,enemies[i],"Find Weakness")) {
                        //TODO:SHADOW?
                        doDamage(caster, enemies[i], this,undefined,this.spellPower*caster.secondaryResource*0.4)
                    }
                }
            }
            if (caster.abilities["Alacrity"].talentSelect) {
                caster.abilities["Alacrity"].applyBuff(caster)
            }
            this.setCd()
            caster.useEnergy(this.cost,this.secCost)
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}
