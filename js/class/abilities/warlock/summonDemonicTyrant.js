class SummonDemonicTyrant extends Ability {
    constructor() {
        let name = "Summon Demonic Tyrant"
        let cost = 2
        let gcd = 1.5
        let castTime = 2
        let cd = 90
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "physical"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 1.2
        this.petData = {
            name:"Demonic Tyrant",
            abilities:{"Demonfire":new Demonfire()},
            color:"rgba(119,88,185,0.84)",
            size:8,
            do:[{name:"cast",ability:"Demonfire"}],
            autoAttackDamage:0.45
        }
        this.petDuration = 15
        this.petId = false
        this.duration = 15
        this.secCost = -5
    }

    getTooltip() {
        return  "Summon a Demonic Tyrant to increase the duration of all of your current lesser demons by 15 sec, and increase the damage of all of your other demons by 15%, while damaging your target.<br><br>" +
            "Generates 0 Soul Shards."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }


            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:(this.castTime/(1+(caster.secondaryResource*0.08)))/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        this.petId = spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this)

        for (let i = 0; i<caster.pets.length; i++) { // ServiceFelguard, Doomguard, Bilescourge, Darkhound, EyeOfGuldan, IllidariSatyr, PrinceMalchezaar, Shivarra, Urzul, ViciousHellhound, VoidTerror, Wrathguard
            if (caster.pets[i].name === "Wild Imp" || caster.pets[i].name === "Dreadstalker" || caster.pets[i].name === "Malicious Imp" || caster.pets[i].name === "Vilefiend") {
                caster.pets[i].duration += 15
            }
        }

        this.setCd()
        caster.useEnergy(this.cost)
    }

}

//
class Demonfire extends Ability {
    constructor() {
        let name = "Demonfire"
        let cost = 0
        let gcd = 1.5
        let castTime = 2
        let cd = 0
        let charges = 1
        let channeling = false
        let casting = true
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 0.325

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
                caster.casting = {name:this.name, time:0, time2:(this.castTime/(1+(caster.secondaryResource*0.08)))/(1 + (caster.stats.haste / 100)),target:caster.castTarget}
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
        if (Object.keys(target).length !== 0 && this.isEnemy(caster,target)) {
            if (this.checkDistance(caster,target)  && !target.isDead) {
                doDamage(caster,target,this)
                caster.useEnergy(this.cost,this.secCost)
                this.setCd()
            }
        }
    }

}
