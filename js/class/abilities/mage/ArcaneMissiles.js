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
        this.missiles = 5
        this.secCost = 0



        this.effect = ""
        this.effectValue = 0



    }

    getTooltip() {
        return "Blasts the target with energy, dealing "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" Arcane damage. Damage increased by 60% per Arcane Charge. Mana cost increased by 100% per Arcane Charge. Generates 1 Arcane Charge"
    }

    run(caster) {
    }

    startCast(caster) {
        let cost = this.cost
        for (let i = 0; i<caster.buffs.length; i++) {
            if (caster.buffs[i].name==="Clearcasting(Mage)") {
                cost = 0
            }
        }

        if (this.checkStart(caster,cost)) {
            let done = false
            if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster) && this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
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
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                caster.isChanneling = true
                caster.channeling = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100)), timer:0, timer2:0.5/(1 + (caster.stats.haste / 100))}
                this.setGcd(caster)
                for (let i = 0; i<caster.buffs.length; i++) {
                    if (caster.buffs[i].name==="Clearcasting(Mage)") {
                        caster.channeling = {name:this.name, time:0, time2:(this.castTime/(1 + (caster.stats.haste / 100)))/1.2, timer:0, timer2:(0.5/(1 + (caster.stats.haste / 100)))/1.44}
                        if (caster.buffs[i].stacks>0) {
                            caster.buffs[i].stacks--
                        } else {
                            caster.buffs.slice(i,1)
                        }
                        return true
                    }
                }
                this.setCd()
                caster.useEnergy(this.cost,this.secCost)
            }
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {

    }

    cast(caster) {
        if (Object.keys(caster.castTarget).length !== 0 && this.isEnemy(caster)) {
            if (this.checkDistance(caster,caster.castTarget)  && !caster.castTarget.isDead) {
                doDamage(caster,caster.castTarget,this)
            }
        }
    }
}
