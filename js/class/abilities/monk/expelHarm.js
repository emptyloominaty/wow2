class ExpelHarm extends Ability {
    constructor(ww = false, bm = false) {
        let name = "Expel Harm"
        let cost = 3
        let gcd = 1.5
        let castTime = 0
        let cd = 15
        let charges = 1
        let maxCharges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)
        this.spellPower = 1.2

        if (ww) {
            this.cost = 15
            this.gcd = 1
            this.hasteGcd = false
            this.secCost = -1
        }
        if (bm) {
            this.cost = 15
            this.gcd = 1
            this.hasteGcd = false
            this.maxCd = 5
        }

    }

    getTooltip() {
        return "Expel negative chi from your body, healing for "+((player.stats.primary * this.spellPower) * (1 + (player.stats.vers / 100))).toFixed(0)+"  and dealing 10% of the amount healed as Nature damage to an enemy within 8 yards. "
    }

    run(caster) {
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            caster.isCasting = true
            caster.casting = {name:this.name, time:0, time2:this.castTime/(1 + (caster.stats.haste / 100))}
            this.setGcd(caster)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

    endCast(caster) {
        caster.isCasting = false
        if (this.charges===this.maxCharges) {
            this.cd = 0
        }
        this.charges--

        let healingSpheres = 0
        if (caster.spec==="mistweaver") {
            caster.abilities["Gust of Mists"].heal(caster,caster)
        } else if (caster.spec==="brewmaster") {
            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Healing Sphere" && caster.buffs[i].caster === caster) {
                    healingSpheres = caster.buffs[i].stacks
                    caster.buffs[i].stacks = 0
                    caster.buffs[i].duration = -1
                }
            }
            caster.abilities["Gift of the Ox"].heal(caster,healingSpheres)
        }
        let spellPower = this.spellPower + (1.5*healingSpheres)
        doHeal(caster,caster,this,undefined,this.spellPower)
        this.setCd()
        for (let i = 0; i<enemies.length ;i++) {
            if (!enemies[i].isDead && this.checkDistance(caster, enemies[i],8) ) {
                doDamage(caster, enemies[i], this,undefined,spellPower/10,)
                break
            }
        }
        caster.useEnergy(this.cost,this.secCost)
    }
}
