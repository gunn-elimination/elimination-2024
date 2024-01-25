// Lol thanks ChatGPT
export function getTodaysChallenge() {
	const currentDate = new Date();
	const day = currentDate.getDate();
	let rule = '';

	switch (day) {
		case 28:
		case 4:
		case 11:
		case 16:
		case 19:
			rule = 'On weekends, players must abide by all rules and must carry a plushie to be safe';
			break;
		case 29:
			rule = 'GAME STARTS\n12 AM: To stay safe, players must hold the animal with their right hand';
			break;
		case 30:
			rule = 'To stay safe, players must be holding the animal with both hands';
			break;
		case 31:
			rule = 'To stay safe, players must be holding animal BELOW waist';
			break;
		case 1:
			rule =
				'Targets Change 10 PM:\nTo stay safe, players must be holding animal ABOVE their shoulder';
			break;
		case 2:
			rule = 'To stay safe, players must be under a roof or overhang';
			break;
		case 5:
			rule = 'Targets Change \n10 PM: To stay safe, players must be touching a wall';
			break;
		case 6:
			rule = 'To stay safe, players must be wearing a HAT.';
			break;
		case 7:
			rule = 'To stay safe, players must be wearing JORTS (jean shorts).';
			break;
		case 8:
			rule = 'Targets Change \n10 PM: To stay safe, players must be wearing a wig';
			break;
		case 9:
			rule = 'To stay safe, players must be SITTING OR LAYING DOWN ON THE GROUND.';
			break;
		case 12:
			rule = 'Targets Change 10 PM:\nTo eliminate others, players must have at least one shoe off.';
			break;
		case 13:
			rule = 'To eliminate others, players must be carrying a football';
			break;
		case 14:
			rule =
				'To eliminate others, players must give their target a flower immediately after eliminating them.';
			break;
		case 15:
			rule = 'Targets Change 10 PM:\nTo eliminate others, players must be wearing a tie';
			break;
		case 20:
			rule = 'NO ONE IS SAFE\n(can be tagged anytime even w/animal)';
			break;
		default:
			rule = 'On weekends, players must abide by all rules and must carry a plushie to be safe';
			break;
	}

	return rule;
}
