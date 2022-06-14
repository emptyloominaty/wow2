class CelestialBrew extends Ability {
    constructor() {
        let name = "Celestial Brew"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 6 //[(Attack power * 6) * (1 + Versatility)]
        this.effect = [{name:"absorb",val:0}]
        this.duration = 8
    }

    getTooltip() {
        return "A swig of strong brew that coalesces purified chi escaping your body into a celestial guard, "+spellPowerToNumber(this.spellPower)+" absorbing  damage. Purifying Stagger damage increases absorption by up to 200%"
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCost(caster) && !caster.isCasting && this.checkCd(caster)) {
            let stacks = 0
            let stacksMul = 0.2
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name === "Purified Chi") {
                    stacks = caster.buffs[i].stacks
                    caster.buffs[i].duration = -1
                    break
                }
            }

            this.effect[0].val = (((caster.stats.primary * this.spellPower) * (1 + (caster.stats.vers / 100)))) * (1+(stacks*stacksMul))

            applyBuff(caster,caster,this)
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
