class AvatarProtection extends Ability {
    constructor() {
        super("Avatar ", -30, 0, 0, 90, false, false, false, "physical", 5, 1)
        this.talent = true
        this.talentSelect = true
        this.duration = 20
        this.effect = [{name:"increaseDamage",val:0.2}]
        this.noGcd = true
    }

    getTooltip() {
        return"Transform into a colossus for 20 sec, causing you to deal 20% increased damage and removing all roots and snares.<br>" + //TODO: remove all roots and snares
            "<br>" +
            "Generates 20 Rage."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.setCd()
            this.setGcd(caster)
            applyBuff(caster,caster,this)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}