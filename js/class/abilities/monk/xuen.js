class InvokeXuentheWhiteTiger extends Ability {
    constructor() {
        let name = "Invoke Xuen, the White Tiger"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 120
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 10
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.duration = 24
        this.damageStored = 0
        this.petData = {
            name:"Xuen",
            abilities:{"Crackling Tiger Lightning":new CracklingTigerLightning(),"Empowered Tiger Lightning":new EmpoweredTigerLightning()},
            color:"#7fd2ff",
            size:7,
            do:[{name:"goMelee"},{name:"cast",ability:"Empowered Tiger Lightning"},{name:"cast",ability:"Crackling Tiger Lightning"}],
        }
        this.petDuration = 30
    }

    getTooltip() {
        return "Summons an effigy of Xuen, the White Tiger for 24 sec. Xuen attacks your primary target, and strikes 3 enemies within 10 yards every 1 sec with Tiger Lightning for (23% of Attack power) Nature damage." +
            " Every 4 sec, Xuen strikes your enemies with Empowered Tiger Lightning dealing 10% of the damage you have dealt to those targets in the last 4 sec."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            spawnPet(caster,"guardian",this.petData.name,caster.x+20,caster.y+20,this)
            applyBuff(caster,caster,this)
            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        }
        return false
    }

    storeDamage(caster,val) {
        this.damageStored += val
    }

    getDamageStored() {
        let val = this.damageStored * 0.1
        this.damageStored = 0
        return val
    }

    endBuff(caster) {
        this.damageStored = 0
    }

}
//----------------------------------------------
class CracklingTigerLightning extends Ability {
    constructor() {
        let name = "Crackling Tiger Lightning"
        let cost = 0
        let gcd = 1
        let castTime = 0
        let cd = 1
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 10
        super(name, cost, gcd, castTime, cd, channeling, casting, canMove, school, range, charges)
        this.spellPower = 0.23

        this.targets = 4
    }
    startCast(caster) {
        if (this.checkStart(caster)) {

            let ttt = 0
            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i],undefined,true)) {
                    doDamage(caster,enemies[i],this)
                    ttt++
                    if (ttt>=this.targets) {
                        break
                    }
                }
            }

            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setCd()
            this.setGcd(caster)
            return true
        }
        return false
    }
}
//----------------------------------------------
class EmpoweredTigerLightning extends Ability {
    constructor() {
        let name = "Empowered Tiger Lightning"
        let cost = 0
        let gcd = 0
        let castTime = 0
        let cd = 4
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 10
        super(name, cost, gcd, castTime, cd, channeling, casting, canMove, school, range, charges)
        this.spellpower = 0.23
        this.targets = 4
        this.noGcd = 0
    }
    startCast(caster) {
        if (this.checkStart(caster)) {
            let val = caster.caster.abilities["Invoke Xuen, the White Tiger"].getDamageStored()

            let ttt = 0
            for (let i = 0; i<enemies.length; i++) {
                if (!enemies[i].isDead && this.checkDistance(caster,enemies[i])) {
                    doDamage(caster,enemies[i],this,undefined,undefined,false,undefined,undefined,undefined,val)
                    ttt++
                    if (ttt>=this.targets) {
                        break
                    }
                }
            }

            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.setCd()
            this.setGcd(caster)
            return true
        }
        return false
    }
}