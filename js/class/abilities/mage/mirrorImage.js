class MirrorImage extends Ability {
    constructor() {
        let name = "Mirror Image"
        let cost = 2
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "arcane"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.duration = 40
        this.effect = [{name:"damageReduction",val:0.15}]

        //TODO: 3 PETS CASTING Frostbolt
    }

    getTooltip() {
        return "Creates 3 copies of you nearby for 40 sec, which cast spells and attack your enemies.<br>" +
            "<br>" +
            "While your images are active damage taken is reduced by 20%. Taking direct damage will cause one of your images to dissipate."
    }

    getBuffTooltip(caster, target, buff) {
        return "Damage taken is reduced by 20% while your images are active."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.effect[0].val = (caster.maxHealth * 0.2) * (1+(caster.stats.vers/100))
            applyBuff(caster,caster,this,undefined,undefined,undefined,undefined,undefined,undefined,undefined,true)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

}
