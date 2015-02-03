var gLogic=gLogic||{}
gLogic.Point=function(){
	this.x=x;
	this.y=y;
}
gLogic.BaseUnit=function(){
	this.x=-1;
	this.y=-1;
	this.hp=100;
	this.moveSkill=null;
	this.triggerSkill=null;
	this.barrierLevel=10;
	this.id=null;

	this.scriptInit=function(x,y,id,direct){
		this.x=x;
		this.y=y;
		this.id=id;
		this.direct=direct;
	}

	this.getId=function(){
		return this.id;
	}

	/**
	 * @return gLogic.MoveSkill|null
	 */
	this.getMoveSkill=function(){return this.moveSkill;}
	/**
	 * @return gLogic.AttackSkill|null
	 */
	this.getAttackSkill=function(){return this.attackSkill;}

	this.getBarrierLevel=function(){return this.barrierLevel}

	this.bindTrigger=function(){}//TODO
	this.removeTrigger=function(){}//TODO
}

gLogic.MoveUnit=function(){
}
gLogic.TriggerUnit=function(){
}
gLogic.BarrierUnit=function(){
}

gLogic.MoveUnit.prototype=new gLogic.BaseUnit();
gLogic.TriggerUnit.prototype=new gLogic.BaseUnit();
gLogic.BarrierUnit.prototype=new gLogic.BaseUnit();
