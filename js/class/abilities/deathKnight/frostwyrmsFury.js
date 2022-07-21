class FrostwyrmsFury extends Ability {
    constructor() {
        let name = "Frostwyrm's Fury"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 180
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "frost"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 3.21*1.05
        this.duration = 10
        this.effect = [{name:"moveSpeed",val:0.5}]
    }

    getTooltip() {
        return "Summons a frostwyrm who breathes on all enemies within 40 yd in front of you, dealing "+spellPowerToNumber(this.spellPower)+" Frost damage and slowing movement speed by 50% for 10 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let dir = caster.direction
            let targets = enemies
            for (let i = 0; i<targets.length ;i++) {
                if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                    let dirToTarget = getDirection(caster,targets[i])
                    if (directionHit(dir,dirToTarget,30)) { //TODO:FIX? AREA?
                        doDamage(caster, targets[i], this)
                        applyDebuff(caster, targets[i], this)
                    }
                }
            }

            caster.useEnergy(this.cost,this.secCost)
            this.setCd()
            this.setGcd(caster)
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
        return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


}
