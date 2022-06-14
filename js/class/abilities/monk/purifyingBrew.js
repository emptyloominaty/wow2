class PurifyingBrew extends Ability {
    constructor() {
        let name = "Purifying Brew"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 20
        let charges = 2
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.noGcd = true
        //this.permanentBuff = true
        this.duration = 15
        this.maxStacks = 10
        this.hasteCd = true
    }

    getTooltip() {
        return "Clears 50% of your damage delayed with Stagger. Increases the absorption of your next Celestial Brew by up to 200%, based on your current level of Stagger"
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting && this.checkCd(caster)) {
            let stacks = 0
            for (let i = 0; i<caster.debuffs.length; i++) {
                if (caster.debuffs[i].type==="stagger") {
                    if (caster.debuffs[i].name === "Heavy Stagger") {
                        stacks = 3
                    } else if (caster.debuffs[i].name === "Moderate Stagger") {
                        stacks = 2
                    } else if (caster.debuffs[i].name === "Light Stagger") {
                        stacks = 1
                    }
                    caster.debuffs[i].effect[0].val = caster.debuffs[i].effect[0].val/2
                    break
                }
            }

            applyBuff(caster,caster,this,stacks,true,"Purified Chi")
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    runBuff(target,buff) {
    }

    endBuff(target) {

    }
}
