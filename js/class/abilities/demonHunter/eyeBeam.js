class EyeBeam extends Ability {
    constructor() {
        let name = "Eye Beam"
        let cost = 30
        let gcd = 1.5
        let castTime = 2
        let cd = 30
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = true
        let school = "chaos"
        let range = 20
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.hasteCd = true

        this.spellPower = 0.12375
        this.duration = 2
        this.effect = [{name:"moveSpeed",val:-10}]
    }

    getTooltip() {
        return "Blasts all enemies in front of you, dealing guaranteed critical strikes" +
            "for up to "+spellPowerToNumber(this.spellPower*10)+"Chaos damage over 2 sec." +
            "When Eye Beam finishes fully channeling, your Haste is increased by an additional 15% for 12 sec"
    }

    startCast(caster) {
        if (this.checkStart(caster) && this.checkDistance(caster,caster.castTarget)) {
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
        let target = caster.channeling.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target) && !target.isDead && this.checkDistance(caster,target)) {
            doDamage(caster,target,this,undefined,undefined,undefined,true)
        }
        let dir = caster.direction
        let targets = enemies
        for (let i = 0; i<targets.length ;i++) {
            if (!targets[i].isDead && this.checkDistance(caster, targets[i],undefined,true)) {
                let dirToTarget = getDirection(caster,targets[i])
                if (directionHit(dir,dirToTarget,50)) {
                    doDamage(caster, targets[i], this,undefined,this.spellPowerSec)
                }
            }
        }
        if (caster.abilities["Blind Fury"].talentSelect) {
            caster.useEnergy(-8)
        }

    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
        checkBuff(caster,caster,"Eye Beam",true)
        applyBuff(caster,caster,caster.abilities["Eye Beam "])
    }

}


//-----------------
class EyeBeamBuff extends Ability {
    constructor() {
        super("Eye Beam ", 0, 0, 0, 0, false, false, false, "chaos", 40, 1)
        this.passive = true
        this.hiddenSB = true
        this.duration = 12
        this.effect = [{name:"increaseStat",stat:"haste",val:15}]
    }

    getBuffTooltip(caster, target, buff) {
        return "Haste is increased by 15% for 12 sec."
    }

}
