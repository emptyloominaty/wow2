class ChaosBrand extends Ability {
    constructor() {
        super("Chaos Brand", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 60
        this.permanentBuff = true
    }

    getTooltip() {
        return "Your damage brands the target, increasing magic damage taken by 5%."
    }
}