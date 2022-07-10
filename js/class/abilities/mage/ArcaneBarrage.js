class ArcaneBarrage extends Ability {
    constructor() {
        let name = "Arcane Barrage"
        let cost = -2 //% mana

        let gcd = 1.5
        let castTime = 0
        let cd = 3
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.728
        this.secCost = "all"

    }

    getTooltip() {
        return "Launches bolts of arcane energy at the enemy target, causing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Arcane damage. For each Arcane Charge, deals 30% additional damage"
    }

    run(caster) {
    }

    startCast(caster) {
        let cost = this.cost * (1 + (caster.secondaryResource))
        if (this.checkStart(caster,cost)) {
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
                caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setGcd(caster)
            }
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        let target = caster.casting.target

        let a = 0
        if (caster.abilities["Resonance"].talentSelect) {
            for (let i = 0; i<enemies.length ;i++) {
                if (!enemies[i].isDead && this.checkDistance(target, enemies[i], 10)) {
                    a++
                }
            }

        }



        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                let spellPower = this.spellPower * (1 + (caster.secondaryResource*0.3))
                spellPower = spellPower * (1 + (((caster.stats.mastery / 100))/4)*caster.secondaryResource)
                doDamage(caster,target,this,undefined,spellPower*(1+(a*0.15)))
                addSpellVisualEffects(caster.x,caster.y,getDirection(caster,target),"projectile",
                    {size:7,speed:24,target:target,color:"#c390ff",onEnd:{},onRun:{name:"fire",color1:"rgba(139,236,255,0.7)",color2:"rgba(213,120,255,0.7)",life:0.4}})

                let ttd = 0
                for (let i = 0; i<enemies.length ;i++) {
                    if (!enemies[i].isDead && enemies[i]!==target &&this.checkDistance(target, enemies[i],10)) {
                        doDamage(caster, enemies[i], this,undefined,spellPower*0.4*(1+(a*0.15)))
                        addSpellVisualEffects(caster.x,caster.y,getDirection(caster,enemies[i]),"projectile",
                            {size:7,speed:24,target:enemies[i],color:"#c390ff",onEnd:{},onRun:{name:"fire",color1:"rgba(48,177,255,0.7)",color2:"rgba(213,120,255,0.7)",life:0.4}})

                        ttd++
                    }
                    if (ttd>caster.secondaryResource) {
                        break
                    }
                }

                let cost = this.cost * caster.secondaryResource
                caster.useEnergy(cost,this.secCost)
                this.cd = 0
            }
        }
    }

    runBuff() {
    }

    endBuff() {
    }
}
