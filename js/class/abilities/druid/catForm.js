class CatForm extends Ability {
    constructor() {
        let name = "Cat Form"
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
        this.effects = [{name:"incAttackSpeed",val:0.4},{name:"moveSpeed",val:0.3}]

        this.actionBar = [false,false,false,false,false,false,false,false,false,false,false,false]
        this.actionBarForm = [false,false,"Dash","Cat Form",false,false,false,false,false,false,false,false]
    }
    //TODO:ENERGY = secondary
    getTooltip() {
        return "Shapeshift into Cat Form, increasing auto-attack damage by 40%, movement speed by 30%, granting protection from Polymorph effects, and reducing falling damage.<br>" +
            "The act of shapeshifting frees you from movement impairing effects." //TODO: frees you from movement impairing effects
    }

    getBuffTooltip(caster, target, buff) {
        return "Autoattack damage increased by 40%.<br>" +
            "Immune to Polymorph effects.<br>" + //TODO:POLYMORPH
            "Movement speed increased by 30% and falling damage reduced."
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
                caster.gcd = 0.3
            }
            return true
        }
        return false
    }
}
