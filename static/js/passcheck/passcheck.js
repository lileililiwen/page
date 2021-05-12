passcheck = function (obj) {

		  var cps = HSIMP.convertToNumber('250000000'),
			  password = obj.value,
			  time, i, checks;
			  
		  warnings.innerHTML = '';
		  
		  if(password) {   
			  time = HSIMP.time(password, cps.numeric);
			  time = HSIMP.timeInPeriods(time);
			  
			  if (time.period === 'seconds') {
				  if (time.time < 0.000001) {
					  result.innerHTML = '你的密码会被黑客攻破<br /><span>立刻补救！</span>';
				  } else if (time.time < 1) {
					  result.innerHTML = '一台普通PC破解你的密码需要<br /><span>' + time.time+' '+time.period+ '</span>';
				  } else {
					  result.innerHTML = '一台普通PC破解你的密码需要<br /><span>约 ' + time.time+' '+time.period+ '</span>';
				  }
			  } else {
			  
				  result.innerHTML = '一台普通PC破解你的密码需要<br /><span>约 ' + time.time+' '+time.period+ '</span>';
			  }
			  
			  checks = HSIMP.check(password);
			  HSIMP.formatChecks(checks.results, warnings);
			  
			  if (checks.insecure) {
				  result.innerHTML = '';
			  }
			  
		  } else {
			  result.innerHTML = '';
		  }
	  };