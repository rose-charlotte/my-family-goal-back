import Joi from "joi";

const schemas = {
	reqParams :  Joi.number()
		.positive()
		.required(),

	createUpdateFamily : Joi.object({
		name : Joi.string()
			.required()
	}),

	updateRole : Joi.object({
		isParent : Joi.boolean()
			.required()
	}),

	createReward : Joi.object({
		title : Joi.string()
			.required(),
		price : Joi.number()
            .integer()
			.positive()
			.required()
	}),

	updateReward : Joi.object({
		title : Joi.string()
			.required(),
		price : Joi.number()
            .integer()
			.positive()
			.required(),
		isPurchase : Joi.boolean()
			.required()
	}),

	searchPseudo : Joi.object({
		pseudo : Joi.string()
			.required()
	}),

	createTask : Joi.object({
		title : Joi.string()
			.required(),
		description : Joi.string(),
		gain : Joi.number()
            .integer()
			.positive()
			.required()
	}),

	updateTask : Joi.object({
		title : Joi.string()
			.required(),
		description : Joi.string(),
		gain : Joi.number()
            .integer()
			.positive()
			.required(),
		isComplete : Joi.boolean()
			.required()
	}),

	connect : Joi.object({
		email : Joi.string()
			.pattern(new RegExp('^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@[a-zA-Z0-9]+[-]?[a-zA-Z0-9]+.[a-z]{2,}$'))
			.required(),
		password : Joi.string()
			.required()
	}),

	createUpdateUser : Joi.object({
		firstname : Joi.string()
			.required(),
		lastname : Joi.string()
			.required(),
		pseudo : Joi.string()
			.pattern(new RegExp('^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+$'))
			.required(),
		email : Joi.string()
			.pattern(new RegExp('^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@[a-zA-Z0-9]+[-]?[a-zA-Z0-9]+.[a-z]{2,}$'))
	})
}

export { schemas }