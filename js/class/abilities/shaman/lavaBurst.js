class LavaBurst extends Ability {
    constructor() {
        let name = "Lava Burst"
        let cost = 0.5 //% mana

        let gcd = 1.5
        let castTime = 2
        let cd = 8
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.972

        this.effect = ""
        this.effectValue = 0

    }

    getTooltip() {
        return "Hurls molten lava at the target, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Fire damage. Lava Burst will always critically strike if the target is affected by Flame Shock"
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                done = true
            } else {
                let newTarget = findNearestEnemy(caster)
                if (newTarget!==false) {
                    if (caster === player) {
                        document.getElementById("raidFrame" + targetSelect).style.outline = "0px solid #fff"
                    }
                    caster.targetObj = newTarget
                    caster.castTarget = newTarget
                    caster.target = newTarget.name
                    if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                        done = true
                    }
                }
            }
            if (done) {
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
                return true
            }

        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster,caster.castTarget)) {
            if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                let crit = false
                for (let i = 0; i<caster.castTarget.debuffs.length; i++) {
                    if (caster.castTarget.debuffs[i].name==="Flame Shock" && caster.castTarget.debuffs[i].caster === caster) {
                        crit = true
                    }
                }
                addSpellVisualEffects(caster.x,caster.y,getDirection(caster,caster.castTarget),"projectile",
                    {size:10,speed:50,target:caster.castTarget,color:"#FF0000",onEnd:{},onRun:{name:"fire",color1:"rgba(182,0,2,0.7)",color2:"rgba(255,59,0,0.7)",life:0.35}})
                doDamage(caster,caster.castTarget,this,undefined,undefined,undefined,crit)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()

            }
        }
    }
}
