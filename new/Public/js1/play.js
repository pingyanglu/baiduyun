$(function(){
        let mid = location.search.slice(location.search.indexOf('=')+1)
        let songlist = JSON.parse(localStorage.song);
        let audio = $('#audio');
        let index = 0;
        let lyric = [];
        /////////////////////查找歌曲index/////////////////
        songlist.forEach((element,i)=>{
            if(element.mid == mid){
                index = i;
            }
        })

        //////////////////处理歌词//////////////
        $.ajax('/new/Public/json/'+songlist[index].mname+'.json',{
            success:function(data){
                let result = data.lrc.lyric.split('\n');
                result.forEach(element=>{
                    let time =  element.substr(1,5);
                    let ci = element.slice(element.indexOf(']')+1);
                    lyric.push({time,ci});
                })
                render(songlist[index],lyric);
            }
        });
////////////////////播放暂停////////////////////////////
        $('.play').on('click',function(){
            if(audio[0].paused){
                audio[0].play();
                console.log(1)
            }else{
                audio[0].pause();
                console.log(0)
            }
        })

///////////////////////歌词同步///////////////////////////////
        let lyrics = $('.lyrics');
        audio[0].ontimeupdate = function(){
            // audio[0].play();
            let ct = timeModel(this.currentTime);
            let dt = timeModel(this.duration);
            let bili = this.currentTime / this.duration;
            $('.ctime').text(ct);
            $('.duration').text(dt);
            $('.mai .select').css('width',bili*100+'%');

            lyric.forEach((v,i)=>{
                let a = 0;
                if(v.time  == ct){
                    a = i;
                    if(i<3){
                        i=0;
                    }else{
                        i -=3;
                    }
                    let str = '';
                    lyrics.empty();
                    for(let j = i;j<lyric.length;j++){
                        str +=`<li class="lis${j}"> ${lyric[j]['ci']}</li>`;
                    }
                    lyrics.html(str);
                    $('.lis'+a).css('color','green');
                }
            })
        }
///////////////////格式化时间//////////////////////////////
        function timeModel(time){
            let m =  Math.floor(time/60)< 10 ? '0'+ Math.floor(time/60) : Math.floor(time/60);
            let s = Math.floor(time%60)< 10 ? '0'+ Math.floor(time%60) : Math.floor(time%60);
            return m+':'+s;
        }

        function render(song,lyric){
            $('.header p').text(song.mname);
            audio.attr('src',song.mmp3);
            audio[0].play()
            $('.ctime').text('00:00');
            $('.duration').text(song.mtime);
            $('.lyrics').empty();
            let str = '';
            lyric.forEach((v,i)=>{
                str +=`
             <li class="lis${i}">${v.ci}</li>
            `;
            })
            $('.lyrics').html(str);


        }

    })