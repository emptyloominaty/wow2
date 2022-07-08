class FieryBrand extends Ability {
    constructor() {
        let name = "Fiery Brand"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 60
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 30
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.33169
        this.effect = [{name:"reduceDamageDoneToCaster",val:0.4,casterId:0,spread:false}]
        this.duration = 10
        this.spellPowerDot = 0.4

        this.timer1 = 0
        this.timer2 = 2
        this.caster = {}
    }

    getTooltip() {
        return "Brand an enemy with a demonic symbol, instantly dealing "+spellPowerToNumber(this.spellPower)+" Fire damage and "+spellPowerHotToNumber(this.spellPowerDot)+" Fire damage over 8 sec<br>" +
            "The enemy's damage done to you is reduced by 40% for 8 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            this.effect[0].casterId = caster.id
            this.effect[0].spread = false
            this.caster = caster
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) ) {
                if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                    doDamage(caster,caster.castTarget,this)
                    applyDebuff(caster,caster.castTarget,this)
                    done = true
                }
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster===player) {
                        document.getElementById("raidFrame"+targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster, caster.targetObj) && !caster.targetObj.isDead) {
                        doDamage(caster,caster.targetObj,this)
                        applyDebuff(caster,caster.targetObj,this)
                        done = true
                    }
                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.useEnergy(this.cost,this.secCost)
                this.setGcd(caster)
                this.setCd()
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


    runBuff(target, buff, id = 0) {
        if (this.caster.abilities["Burning Alive"].talentSelect) {
            if (this.timer1<this.timer2) {
                this.timer1 += progressInSec
            } else {
                if (!buff.effect[0].spread) {
                    for (let i = 0; i < enemies.length; i++) {
                        if (!enemies[i].isDead && this.checkDistance(target, enemies[i], 8, true) && !checkDebuff(this.caster, enemies[i], "Fiery Brand")) {
                            this.effect[0].spread = true
                            doDamage(this.caster, enemies[i], this)
                            applyDebuff(this.caster, enemies[i], this, undefined, undefined, undefined, undefined, buff.duration)
                            break
                        }
                    }
                }
                this.timer1 = 0
            }
        }
    }

}
