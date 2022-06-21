class Yulon extends Ability {
    constructor() {
        let name = "Invoke Yu'lon, the Jade Serpent"
        let cost = 5
        let gcd = 1.5
        let castTime = 0
        let cd = 180
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.05

        this.petData = {
            name:"Yu'lon",
            abilities:{"Soothing Breath":new SoothingBreath()},
            color:"#7dff97",
            size:6,
            do:[{name:"cast",ability:"Soothing Breath"}],
        }
        this.petDuration = 25
    }

    getTooltip() {
        return "Summons an effigy of Yu'lon, the Jade Serpent for 25 sec. Yu'lon will heal injured allies with Soothing Breath, healing the target and up to 2 allies for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+" over 4.5 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster.pets.length===0) {
                caster.pets.push(new Pet(caster.pets.length,caster,"guardian",this.petDuration,this.petData,caster.x+20,caster.y+20))
            } else {
                let undefined = false
                let statue = false
                for (let i = 0; i<caster.pets.length; i++) {
                    if (caster.pets[i]!==undefined) {
                        if (caster.pets[i].name === "Yu'lon") {
                            statue = i
                        }
                        if (caster.pets[i] === undefined) {
                            undefined = i
                        }
                    }
                }
                if (statue!==false){
                    caster.pets[statue] = new Pet(statue,caster,"guardian",this.petDuration,this.petData,caster.x+20,caster.y+20)
                } else if (undefined!==false) {
                    caster.pets[undefined] = new Pet(undefined,caster,"guardian",this.petDuration,this.petData,caster.x+20,caster.y+20)
                } else {
                    caster.pets.push(new Pet(caster.pets.length,caster,"guardian",this.petDuration,this.petData,caster.x+20,caster.y+20))
                }
            }


            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast() {

    }
}

//--------------------------------------------------------------------
class SoothingBreath extends Ability {
    constructor() {
        let name = "Soothing Breath"
        let cost = 0
        let gcd = 1
        let castTime = 1
        let cd = 4.5
        let charges = 1
        let channeling = true
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 0.2625
        this.duration = 4.5
        this.targets = 2
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            caster.isChanneling = true
            caster.channeling = {name:this.name, time:0, time2:this.duration/(1 + (caster.stats.haste / 100)), timer:0, timer2:1/(1 + (caster.stats.haste / 100)),target:caster.castTarget}

            this.setGcd(caster)
            return true
        }
        return false
    }

    cast(caster) {
        let tt = 0
        let array = createArrayAndShuffle(friendlyTargets.length)
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[array[i]].isDead && friendlyTargets[array[i]].health<friendlyTargets[array[i]].maxHealth && this.checkDistance(caster, friendlyTargets[array[i]])) {
                doHeal(caster.caster, friendlyTargets[array[i]], this)
                tt++
                if (tt > this.targets) {
                    break
                }
            }
        }
    }
}
//--------------------------------------------------------------------
class EnvelopingBreath extends Ability {
    constructor() {
        let name = "Enveloping Breath"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.passive = true

        this.spellPower = 1.8
        this.duration = 6
        this.targets = 6
        this.effect = [{name:"healingIncreaseMistweaver",val:0.1}]
    }

    getTooltip() {
        return "While active, Yu'lon and Chi'Ji heal up to 6 nearby targets with Enveloping Breath when you cast Enveloping Mist, healing for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))* (1 + (player.stats.haste / 100))).toFixed(0)+" over 6 sec, and increasing the healing they receive from you by 10%."
    }

    cast(caster,target) {
        let tt = 0
        let array = createArrayAndShuffle(friendlyTargets.length)
        for (let i = 0; i<friendlyTargets.length; i++) {
            if (!friendlyTargets[array[i]].isDead && friendlyTargets[i].health<friendlyTargets[array[i]].maxHealth && this.checkDistance(target, friendlyTargets[array[i]])) {
                applyHot(caster, friendlyTargets[array[i]], this)
                tt++
                if (tt >= this.targets) {
                    break
                }
            }
        }
    }
}