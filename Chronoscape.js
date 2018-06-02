function openAnim() {
    var tbd1 = $("#tbdecor1")[0];
	$(tbd1).animate({ marginLeft: "64px" },1000);
	tbd1.style.backgroundColor = "#FFFFFF";
	
	var tt1 = $("#toptitle1")[0];
	tt1.style.paddingTop = "20px";
	tt1.style.color = "#FFFFFF";
	tt1.style.textShadow = "0px 0px 7px #FFFFFF"
	
	var tt2 = $("#toptitle2")[0];
	tt2.style.paddingTop = "5px";
	tt2.style.color = "#00AAFF";
	tt2.style.textShadow = "0px 0px 5px #00AAFF"
	
	//select marker
	var mark = $("#tbdecor2")[0];
	mark.style.width = 0;
	$(mark).animate({ width: "50px" },1000);
	
	setupTTags();
	setupEventframes();
	
	$(window).resize(function() { refreshGraphics(); });
	refreshGraphics();
	$("#content").scroll(function () { checkScroll(); });
	
	scrollnoteOpen();
}

function setupTTags() {
	var ttags = $(".ttag");
	for(var i = 0; i < ttags.length; i++) {
		var tt = ttags[i];
		if(i == 0)
			focusTTag(tt);
		tt.id = "e" + i;
		$(tt).mouseenter(function() { ttagJump(this); });
		$(tt).mouseleave(function() { ttagFall(this); });
		$(tt).click(function() { focusTTag(this); });
		tt.style.marginLeft = "64px";
		var transLen = 1.5+(i/10);
		tt.style.transition = transLen + "s";
		//blips
		var blip = document.createElement("img");
		blip.src = 'img/ttag-blip.png';
		blip.classList.add('ttblip');
		tt.insertBefore(blip,tt.firstChild);
		$(blip).animate({ left: "58px" },1000);
		
	}
	
	var tstamps = $(".tstamp");
	for(var i = 0; i < tstamps.length; i++) {
		var ts = tstamps[i];
		ts.style.color = "#00AAFF";
		ts.style.textShadow = "0px 0px 3px #00AAFF"
		var transLen = 1.5+(i/10);
		ts.style.transition = transLen + "s";
	}
	
	var stitles = $(".stitle");
	for(var i = 0; i < stitles.length; i++) {
		var st = stitles[i];
		st.style.color = "#FFFFFF";
		st.style.textShadow = "0px 0px 5px #FFFFFF"
		var transLen = 1.5+(i/10);
		st.style.transition = transLen + "s";
	}
}

function setupEventframes() {
	var eframes = $(".eventframe");
	for(var i = 0; i < eframes.length; i++) {
		var ef = eframes[i];
		ef.id = "f" + i;
		var ttag = $("#e" + i);
		
		var stitle = ttag.find(".stitle").text();
		var title = document.createElement("h3");
		$(title).text(stitle);
		ef.insertBefore(title,ef.firstChild)
		
		var tstamp = ttag.find(".tstamp").text();
		var ts = document.createElement("div");
		ts.classList.add("titledate");
		$(ts).text(tstamp);
		ts.style.left = "0px";
		ef.insertBefore(ts,ef.firstChild)
		
		var date = ttag.find(".date").text();
		var dt = document.createElement("div");
		dt.classList.add("titledate");
		$(dt).text(date + " CE");
		dt.style.right = "0px";
		ef.insertBefore(dt,ef.firstChild)
		
	}
}

function refreshGraphics() {
	$(".delonrefresh").each(function() { $(this).remove(); });
	//text lines
	var texts = $(".text");
	for(var i = 0; i < texts.length; i++) {
		var txt = texts[i];
		var lineHeight = 36;
		var lineWidth = txt.scrollWidth;
		var rawHeight = Math.ceil((txt.scrollHeight - 17)/lineHeight)*lineHeight+1;
		var txtHeight = rawHeight + "px";
		
		var bline = document.createElement("div");
		bline.classList.add('tlcontainer');
		bline.classList.add('delonrefresh');
		bline.style.float = "left";
		bline.style.height = txtHeight;
		
			var bldecor1 = document.createElement("div");
			bldecor1.classList.add('textline');
			bldecor1.classList.add('delonrefresh');
			bldecor1.style.height = txtHeight;
		bline.appendChild(bldecor1);
		
		for(var j = 0; j < rawHeight; j += lineHeight) {
			//little spikes
			var back;
			if(j % (lineHeight*2) == 0 && j+1 != rawHeight) {
				back = document.createElement("div");
				back.classList.add('tlbar');
				back.classList.add('delonrefresh');
				back.style.width = lineWidth - 3 + "px";
				back.style.height = lineHeight + "px";
				back.style.marginTop = j + "px";
		bline.insertBefore(back,bline.firstChild);
			}
			var spike = document.createElement("div");
			spike.classList.add('tlspike');
			spike.classList.add('delonrefresh');
			spike.style.marginTop = j + "px";
		bline.insertBefore(spike,bline.firstChild);
			
			var spike = document.createElement("div");
			spike.classList.add('tlspike');
			spike.classList.add('delonrefresh');
			spike.style.marginTop = j + "px";
			spike.style.marginLeft = lineWidth - 3 + "px";
		bline.insertBefore(spike,bline.firstChild);
		}
		
		var aline = document.createElement("div");
		aline.classList.add('tlcontainer');
		aline.classList.add('delonrefresh');
		aline.style.float = "right";
		aline.style.height = txt.scrollHeight + 10 + "px";
		
			var aldecor1 = document.createElement("div");
			aldecor1.classList.add('textline');
			aldecor1.classList.add('delonrefresh');
			aldecor1.style.float = "right";
			aldecor1.style.height = txtHeight;
		aline.appendChild(aldecor1);
		
		txt.insertBefore(aline,txt.firstChild);
		txt.insertBefore(bline,aline);
	}
}

function ttagJump(ttag) {
	ttag.style.transition = "0.5s";
	ttag.style.paddingLeft = "30px";
}

function ttagFall(ttag) {
	ttag.style.transition = "0.5s";
	ttag.style.paddingLeft = "20px";
}

function focusTTag(ttag, scrollContent = 1, speed = 500) {
	var mark = $('#tbdecor2')[0];
	if(!$.contains(ttag, mark)) {
		$('#tbdecor2').each(function() {this.id = "tbdecor2dead";});
		var markv2 = document.createElement("div");
		markv2.id = "tbdecor2";
		markv2.style.width = "0px";
		ttag.insertBefore(markv2, ttag.firstChild);
		$(markv2).animate({ width: "50px" },500);
		$(mark).animate({ width: "0px" },500,"swing",function() {
				!$('#tbdecor2dead:animated').remove();
			});
	}
	scrollTimeline(ttag,speed);
	if(ttag.id != "" && scrollContent)
		scrollToTarget(ttag.id.substring(1));
}

function scrollTimeline(ttag, speed = 500) {
	var topPos = ttag.offsetTop;
	$('#timebar').animate({ scrollTop: topPos-250 }, 500);
	scrollLocked = 1;
	setTimeout(function() {
		scrollLocked = 0;
	},speed);
}

function scrollToTarget(id = 0) {
	var target = $('#f'+id)[0];
	if(target == undefined)
		return;
	var topPos = target.offsetTop;
	$('#content').animate({ scrollTop: topPos-220 }, 500);
}

var scrollLock; //:sob: :sob: :sob: 
var canScroll = 1; 
function checkScroll() {
	if(!$(scrollLock).is(":animated")) {
		canScroll = 1;
	}
	if(!canScroll || scrollLocked) {
		return;
	}
	var content = $("#content");
	var accumulatedHeight = 0;
	var eventframes = $(".eventframe");
	for(var i = 0; i < eventframes.length; i++) {
		var ef = eventframes[i];
		accumulatedHeight += (ef.scrollHeight + 30);
		if(content.scrollTop() < accumulatedHeight) {
			var ttag = $("#e" + i)[0];
			var mark = $('#tbdecor2')[0];
			if(!$(ttag).is(':animated') && !$.contains(ttag,mark)) {
				focusTTag(ttag,0,200);
				canScroll = 0;
				scrollLock = ttag;
			}
			break;
		}
	}
}

function scrollnoteOpen() {
	setTimeout(function() {
		$('#scrollnote').animate({ bottom: "0px"},1700).mouseenter(function() {
			scrollnoteClose();
		});
		$('#timebar').scroll(function() {
			scrollnoteClose();
		});
	},4000);
}

function scrollnoteClose(){
	$('#scrollnote').animate({left: "-120px"},1000);
}





