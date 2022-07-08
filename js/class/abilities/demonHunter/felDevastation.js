class FelDevastation extends Ability {
    constructor() {
        let name = "Fel Devastation"
        let cost = 50
        let gcd = 1.5
        let castTime = 2
        let cd = 60
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "fire"
        let range = 20
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true

        this.spellPower = 0.15561
        this.spellPowerHeal = 0.4095
        this.duration = 2
        this.effect = [{name:"moveSpeed",val:-10}]
    }

    getTooltip() {
        return "Unleash the fel within you, damaging enemies directly in front of you for "+spellPowerToNumber(this.spellPower*10)+" Fire damage over 2 sec. Causing damage also heals you for up to "+spellPowerToNumber(this.spellPowerHeal*10)+" health."

    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
            if (caster.abilities["Demonic"].talentSelect) {
                let extended = false
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Metamorphosis") {
                        caster.buffs[i].duration += 8
                        extended = true
                        break
                    }
                }
                if (!extended) {
                    applyBuff(caster,caster,caster.abilities["Metamorphosis"],undefined,undefined,undefined,8)
                    caster.abilities["Shear"].cost -= 40
                    caster.abilities["Shear"].fragments ++
                    caster.abilities["Fracture"].cost -= 40
                    caster.abilities["Fracture"].fragments ++
                }
            }
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:0.2/(1 + (caster.stats.haste / 100)), timer2:0.2/(1 + (caster.stats.haste / 100)),target:caster.castTarget}

            caster.canMoveWhileCasting = true
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    cast(caster) {
        let dir = caster.direction
        let targets = enemies
        for (let i = 0; i<targets.length ;i++) {
            if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                let dirToTarget = getDirection(caster,targets[i])
                if (directionHit(dir,dirToTarget,50)) {
                    doDamage(caster, targets[i], this)
                    doHeal(caster,caster,this,undefined,this.spellPowerHeal)
                }
            }
        }
    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
        checkBuff(caster,caster,"Fel Devastation",true)
    }

}


