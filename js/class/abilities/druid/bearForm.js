class BearForm extends Ability {
    constructor() {
        let name = "Bear Form"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0
        this.effects = [{name:"increaseArmor",val:3.2},{name:"increaseStat",stat:"stamina",val:25}]

        this.actionBar = [false,false,false,false,false,false,false,false,false,false,false,false]
        this.actionBarForm = ["Growl",false,false,"Cat Form",false,false,false,false,false,false,false,false]
    }

    getTooltip() {
        return "Shapeshift into Bear Form, increasing armor by 220% and Stamina by 25%, granting protection from Polymorph effects, and increasing threat generation." +
        "The act of shapeshifting frees you from movement impairing effects." //TODO: frees you from movement impairing effects
    }

    getBuffTooltip(caster, target, buff) {
        return "Armor increased by 220%.<br>" +
            "Stamina increased by 25%.<br>" +
            "Immune to Polymorph effects."
    }

    startCast(caster) {
        if (this.checkStart(caster,undefined,undefined,false)) {
            this.setCd()
            let form = changeForm(caster,this)
            setTimeout(()=>{
                if (caster===player) {
                    if (form) {
                        for (let i = 0; i<this.actionBar.length; i++) {
                            if (actionBars[1].abilities[i])  {
                                this.actionBar[i] = actionBars[1].abilities[i]
                            }
                        }
                        for (let i = 0; i<this.actionBarForm.length; i++) {
                            if (this.actionBarForm[i]) {
                                actions[this.actionBarForm[i]] = new Action(this.actionBarForm[i], 1, i)
                            }
                        }
                    } else {
                        for (let i = 0; i<this.actionBarForm.length; i++) {
                            if (actionBars[1].abilities[i])  {
                                this.actionBarForm[i] = actionBars[1].abilities[i]
                            }
                        }
                        for (let i = 0; i<this.actionBar.length; i++) {
                            if (this.actionBar[i]) {
                                actions[this.actionBar[i]] = new Action(this.actionBar[i], 1, i)
                            }
                        }
                    }
                }
            },120)
            caster.useEnergy(this.cost)
            if (form) {
                this.setGcd(caster)
            } else {
                caster.gcd = 0.15
            }
            return true
        }
        return false
    }
}
