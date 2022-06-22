class MysticTouch extends Ability {
    constructor() {
        super("Mystic Touch", 0, 0, 0, 0, false, false, false, "physical", 5, 1)
        this.passive = true
        this.duration = 60
        this.permanentBuff = true
    }

    getTooltip() {
        return "Your damage weakens the target, increasing Physical damage taken by 5%."
    }
}