class ArcaneMissiles extends Ability {
    constructor() {
        let name = "Arcane Missiles"
        let cost = 15 //% mana

        let gcd = 1.5
        let castTime = 2.5
        let cd = 0
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "arcane"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.4374
        this.secCost = 0

        this.polygonData = {x1:-4,y1:0,x2:0,y2:-7,x3:4,y3:0,x4:0,y4:7}

    }

    getTooltip() {
        return "Blasts the target with energy, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Arcane damage. Damage increased by 60% per Arcane Charge. Mana cost increased by 100% per Arcane Charge. Generates 1 Arcane Charge"
    }

    run(caster) {
    }

    startCast(caster) {
        let cost = this.cost
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Clearcasting " || caster.buffs[i].name==="Rule of Threes") {
                cost = 0
            }
        }

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
                    done = true
                }
            }
            if (done) {
                let cost = this.cost
                let timer = 0.5
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Clearcasting ") {
                        cost = 0
                         timer = 0.405
                        if (caster.buffs[i].stacks>0) {
                            caster.buffs[i].stacks--
                        } else {
                            caster.buffs.slice(i,1)
                        }
                    }
                    if (caster.buffs[i].name === "Rule of Threes") {
                        caster.buffs[i].duration = -1
                        cost = 0
                    }
                }
                if (caster.abilities["Amplification"].talentSelect) {
                    timer -= 0.095
                }
                caster.isChanneling = true
                caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:timer/(1 + (caster.stats.haste / 100)), timer2:timer/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
                this.setGcd(caster)
                this.setCd()
                caster.useEnergy(cost,this.secCost)
                if (caster.abilities["Slipstream"].talentSelect) {
                    caster.canMoveWhileCasting = true
                }
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }


    cast(caster) {
        caster.isCasting = false
        let target = caster.channeling.target
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                doDamage(caster,target,this)

                let missilePosition = [
                    {x:0,y:0},
                    {x:Math.cos(caster.direction)*5,y:Math.sin(caster.direction)*5},
                    {x:Math.cos(caster.direction)*(-5),y:Math.sin(caster.direction)*(-5)}
                ]

                for (let i = 0; i<3; i++) {
                    addSpellVisualEffects(caster.x+missilePosition[i].x,caster.y+missilePosition[i].y,getDirection(caster,target),"projectile",
                        {size:4,speed:40,target:target,color:"#bb4eff",onEnd:{},onRun:{name:"fire",color1:"rgba(197,72,255,0.7)",color2:"rgba(241,173,255,0.7)",life:0.35},quadrilateral:true,polygonData:this.polygonData})
                }

            }
        }
    }

    endChanneling(caster) {
        caster.canMoveWhileCasting = false
    }
}
