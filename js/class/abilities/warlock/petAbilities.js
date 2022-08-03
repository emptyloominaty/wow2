class CommandDemon extends Ability {
    constructor() {
        let name = "Command Demon"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "shadow"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.noGcd = true
        this.pet = false
    }

    getTooltip() {
        let text = "Commands your demon to perform its most powerful ability. This spell will transform based on your active pet." +
            "Felhunter: Spell Lock<br>" +
            "Voidwalker: Shadow Bulwark<br>" +
            "Succubus: Seduction<br>" +
            "Imp: Singe Magic<br><br>"

        if (this.pet==="Imp") {
            text += "Burns harmful spells, removing 1 harmful Magic effect from an ally."
        } else if (this.pet==="Felhunter") {
            text += "Counters the enemy's spellcast, preventing any spell from that school of magic from being cast for 6 sec."
        }

        return text
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.pet!==false) {

            if (this.pet==="Imp") {
                this.cd = 15
                this.maxCd = 15
                let target = caster.castTarget
                if (this.isEnemy(caster,target) || target.isDead || target==="" || Object.keys(target).length === 0) {
                    dispel(caster,caster,"magic", false, false)
                } else {
                    dispel(caster,target,"magic", false, false)
                }
            } else if (this.pet==="Felhunter") {
                this.cd = 24
                this.maxCd = 24
                if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        if (caster.castTarget.interrupt()) {
                            this.effect = [{name:"interrupt"}]
                            this.duration = 6
                            applyDebuff(caster,caster.castTarget,this)
                        }
                    }
                }
            }
            //Seduction
            //30s Cd
            //Seduces the target, disorienting and causing them to walk towards the demon for 30 sec. Damage may break the effect. Only usable against Humanoids.


            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }
}
