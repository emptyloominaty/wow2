class FireElemental extends Ability {
    constructor() {
        let name = "Fire Elemental"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 150
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "fire"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.spellPower = 1.05
        this.duration = 30
        this.petData = {
            name:"Fire Elemental",
            abilities:{"Fire Blast":new FireBlastElemental()},
            color:"#ff5230",
            size:7,
            do:[{name:"cast",ability:"Fire Blast"}],
        }
        this.petDuration = 30
    }

    getTooltip() {
        return "Calls forth a Greater Fire Elemental to rain destruction on your enemies for 30 sec.While the Fire Elemental is active, Flame Shock deals damage 25% faster and newly applied Flame Shocks last 100% longer"
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }

            if (caster.abilities["Primal Elementalist"].talentSelect) {
                this.petData.abilities = {"Fire Blast":new FireBlastElemental(true),"Immolate":new ImmolateElemental(true),"Meteor":new MeteorElemental(true)}
                this.petData.do = [{name:"cast",ability:"Meteor"},{name:"castDot",ability:"Immolate"},{name:"cast",ability:"Fire Blast"}]
                this.petData.size = 10
            } else {
                this.petData.abilities = {"Fire Blast":new FireBlastElemental()}
                this.petData.do = [{name:"cast",ability:"Fire Blast"}]
                this.petData.size = 7
            }


            spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this)
            applyBuff(caster,caster,this)
            caster.abilities["Flame Shock"].duration *= 2
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endBuff(caster) {
        caster.abilities["Flame Shock"].duration /= 2
    }
}

//--------------------------------------------------------------------

