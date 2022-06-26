class LavaBurst extends Ability {
    constructor(ele=false,resto=false) {
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
        if (ele) {
            this.cost = -10
            this.spellPower = this.spellPower*1.05
        } else if (resto) {
            this.spellPower = this.spellPower*1.15
            this.spellPower = this.spellPower*1.27
        }
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
                let castTime = this.castTime
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Lava Surge") {
                        caster.buffs[i].duration = -1
                        castTime = 0
                    }
                }
                caster.isCasting = true
                caster.casting = {name:this.name, time:0, time2:castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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
        caster.isCasting = false
        let target = caster.casting.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                let crit = false
                for (let i = 0; i<target.debuffs.length; i++) {
                    if (target.debuffs[i].name==="Flame Shock" && target.debuffs[i].caster === caster) {
                        crit = true
                    }
                }

                if (caster.spec==="elemental" && caster.abilities["Master of the Elements"].talentSelect) {
                    applyBuff(caster,caster,caster.abilities["Master of the Elements"])
                }

                addSpellVisualEffects(caster.x,caster.y,getDirection(caster,target),"projectile",
                    {size:10,speed:50,target:target,color:"#FF0000",onEnd:{},onRun:{name:"fire",color1:"rgba(182,0,2,0.7)",color2:"rgba(255,59,0,0.7)",life:0.35}})
                if (caster.spec==="elemental") {
                    caster.abilities["Surge of Power"].enhance(caster,target,this)
                }
                doDamage(caster,target,this,undefined,undefined,undefined,crit)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()

            }
        }
    }
}
