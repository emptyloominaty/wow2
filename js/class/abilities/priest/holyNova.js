class HolyNova extends Ability {
    constructor() {
        let name = "Holy Nova"
        let cost = 1.6 //% mana

        let gcd = 1.5
        let castTime = 0
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = true
        let school = "holy"
        let range = 12
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.18*1.44
        this.targetsHeal = 5
//TODO: If your Holy Nova deals damage to at least 3 enemies, a second Holy Nova will be cast a moment later at 50% effectiveness at the same location.

    }

    getTooltip() {
        let tooltip = "An explosion of holy light around you deals up to "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Holy damage to enemies and up to "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+"" +
            " healing to allies within 12 yds."

        //TODO:HOLY/DISC
        tooltip += "If your Holy Nova deals damage to at least 3 enemies, a second Holy Nova will be cast a moment later at 50% effectiveness at the same location."

        return tooltip
    }

    run(caster) {
    }

    startCast(caster) {
        if (caster.gcd<=0 && this.checkCd(caster) &&this.checkCost(caster) && !caster.isCasting) {

            //damage
            let ttd = 0
            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(caster, enemies[i]) ) {
                    doDamage(caster, enemies[i], this)
                    ttd++
                }
            }
            if (ttd>2) {
                for (let i = 0; i<enemies.length ;i++) {
                    if (!enemies[i].isDead && this.checkDistance(caster, enemies[i]) ) {
                        doDamage(caster, enemies[i], this,undefined,this.spellPower/2)
                    }
                }
            }

            //healing
            let tth = 0
            for (let i = 0; i<friendlyTargets.length ;i++) {
                if (!friendlyTargets[i].isDead && friendlyTargets[i].health<friendlyTargets[i].maxHealth && this.checkDistance(caster, friendlyTargets[i])) {
                    doHeal(caster, friendlyTargets[i], this)
                    if (ttd>2) {
                        doHeal(caster, friendlyTargets[i], this,undefined,this.spellPower/2)
                    }
                    tth++
                }
                if (tth>this.targetsHeal) {
                    break
                }
            }

            if (caster.isChanneling) {
                caster.isChanneling = false
                caster.channeling = {name:"", time:0, time2:0, timer:0, timer2:0}
            }
            caster.useEnergy(this.cost)
            this.setGcd(caster)
            return true
        } else if (caster===player && caster.gcd<spellQueueWindow && caster.gcd>0) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
    }

    runBuff() {
    }

    endBuff() {
    }
}
