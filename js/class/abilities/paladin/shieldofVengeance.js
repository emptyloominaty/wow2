class ShieldofVengeance extends Ability {
    constructor() {
        let name = "Shield of Vengeance"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "holy"
        let range = 5
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"absorb",val:0}]
        this.duration = 15
    }

    getTooltip() {
        return "Creates a barrier of holy light that absorbs "+(player.maxHealth*0.3 * (1+(player.stats.vers/100))).toFixed(0)+" damage for 15 sec.<br>" +
            "<br>" +
            "When the shield expires, it bursts to inflict Holy damage equal to the total amount absorbed, divided among all nearby enemies. "
    }

    getBuffTooltip(caster, target, buff) {
        return "Absorbs "+buff.effect[0].val+" damage and deals damage when the barrier fades or is fully consumed."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
                 this.effect[0].val = (caster.maxHealth * 0.3 * (1+(caster.stats.vers/100)))

            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    runBuff(caster, buff, id = 0) {
        if (buff.effect[0].val<=0) {
            buff.duration = -1
        }
    }

    endBuff(caster,id) {
        let absorbVal = (caster.maxHealth * 0.3 * (1+(caster.stats.vers/100)))
        let val = (absorbVal-(caster.buffs[id].effect[0].val))

        for (let i = 0; i<enemies.length; i++) {
            if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],8,true)) {
                doDamage(caster, enemies[i], this,undefined,undefined,false,undefined,undefined,undefined,val)
            }
        }

    }
}
