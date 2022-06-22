class Transcendence extends Ability {
    constructor(wwbm = false) {
        let name = "Transcendence"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 10
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        this.effect = [{name:"TranscendenceMonk",x:0,y:0}]
        this.duration = 900
        if (wwbm) {
            this.gcd = 1
            this.hasteGcd = false
        }
        this.area = {type:"circle", radius:0.8, duration: this.duration,data:{type:"none",color:"rgba(155,255,162,0.81)",color2:"rgba(150,255,181,0.18)"},cast:false}
    }

    getTooltip() {
        return "Split your body and spirit, leaving your spirit behind for 15 min. Use Transcendence: Transfer to swap locations with your spirit."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            if (caster.isChanneling) {
                caster.isChanneling = false
            }
            this.effect[0].x = caster.x+0.1
            this.effect[0].y = caster.y+0.1
            applyBuff(caster,caster,this)

            if (areas[this.areaId]) {
                areas[this.areaId].duration = -1
            }

            this.areaId = addArea(areas.length,caster,this,this.area.type,this.area.duration,this.area.data,caster.x,caster.y,true,this.area.radius)

            this.setCd()
            this.setGcd(caster)
            caster.useEnergy(this.cost)
            return true
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }
}

class TranscendenceTransfer extends Ability {
    constructor(wwbm = false) {
        let name = "Transcendence: Transfer"
        let cost = 0
        let gcd = 1.5
        let castTime = 0
        let cd = 45
        let charges = 1
        let channeling = false
        let casting = false
        let canMove = false
        let school = "nature"
        let range = 40
        super(name,cost,gcd,castTime,cd,channeling,casting,canMove,school,range,charges)

        if (wwbm) {
            this.gcd = 1
            this.hasteGcd = false
        }
    }

    getTooltip() {
        return "Your body and spirit swap locations."
    }

    startCast(caster) {
        if (this.checkStart(caster)) {
            let done = false

            for (let i = 0; i<caster.buffs.length; i++) {
                if (caster.buffs[i].name==="Transcendence") {
                    caster.buffs[i].duration = caster.abilities["Transcendence"].duration-0.1

                    if (areas[caster.abilities["Transcendence"].areaId]) {
                        areas[caster.abilities["Transcendence"].areaId].duration = -1
                    }
                    let tr = caster.abilities["Transcendence"]
                    tr.areaId = addArea(areas.length,caster,tr,tr.area.type,tr.area.duration,tr.area.data,caster.x,caster.y,true,tr.area.radius)

                    done = true
                    let xx = caster.buffs[i].effect[0].x-0.1
                    let yy = caster.buffs[i].effect[0].y-0.1
                    caster.buffs[i].effect[0].x = caster.x+0.1
                    caster.buffs[i].effect[0].y = caster.y+0.1
                    caster.x = xx+0.01
                    caster.y = yy+0.01

                }
            }
            if (done) {
                if (caster.isChanneling) {
                    caster.isChanneling = false
                }
                this.setCd()
                this.setGcd(caster)
                caster.useEnergy(this.cost)
                return true
            }
        } else if (this.canSpellQueue(caster)) {
            spellQueue.add(this,caster.gcd)
        }
        return false
    }

}

