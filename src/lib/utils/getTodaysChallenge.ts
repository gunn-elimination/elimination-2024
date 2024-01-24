const gameRules: any = {
	'01-28': 'On weekends, players must abide by all rules and must carry a plushie to be safe',
	'01-29': 'GAME STARTS\n12 AM: To stay safe, players must hold the animal with their right hand',
	'01-30': 'To stay safe, players must be holding the animal with both hands',
	'01-31': 'To stay safe, players must be under a roof or overhang',
	'02-01': 'To stay safe, players must be holding animal ABOVE their shoulder',
	'02-02': 'To stay safe, players must be holding animal BELOW waist',
	'02-03': 'On weekends, players must abide by all rules and must carry a plushie to be safe',
	'02-04': 'On weekends, players must abide by all rules and must carry a plushie to be safe',
	'02-05': 'Targets Change\n8 PM: To stay safe, players must be touching a wall',
	'02-06': 'To stay safe, players must be wearing a HAT.',
	'02-07': 'Targets Change\n8 PM: To stay safe, players must be wearing JEANS.',
	'02-08': 'To stay safe, players must be',
	'02-09': 'To stay safe, players must be SITTING OR LAYING DOWN ON THE GROUND.',
	'02-10': 'For this week, nobody is safe: there are only requirements for eliminating others.',
	'02-11': 'For this week, nobody is safe: there are only requirements for eliminating others.',
	'02-12': 'To eliminate others, players must have at least one shoe off.',
	'02-13': 'To eliminate others,',
	'02-14':
		'To eliminate others, players must give their target a flower immediately after eliminating them.',
	'02-15': 'To eliminate others, players must',
	'02-16':
		'On weekends, players must abide by all rules and must carry a plushie to be safe\n(No school 1/16)',
	'02-17': '',
	'02-18': '',
	'02-19': 'Weekend rules still apply.\n(No school 1/19)',
	'02-20': 'NO ONE IS SAFE\n(can be tagged anytime even w/animal)'
};

export function getTodaysChallenge() {
	// Example of how to access the rule for the current date
	const today = new Date('Jan 28');
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const date = String(today.getDate()).padStart(2, '0');
	const ruleForToday = gameRules[`${month}-${date}`];

	console.log(ruleForToday); // This will print the rule for the current date
	return ruleForToday;
}
