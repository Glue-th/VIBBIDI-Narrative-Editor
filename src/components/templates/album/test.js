import { getRandomInt } from '../../../util/utils';

export const generateDataReport = () => {
    const data = [];
    // eslint-disable-next-line
    for (let i = 0; i <= 50; i++) {
        data.push({
            UUID: `A8C040AA49124C119EB8AB5D7D9F720${i}`,
            keyword: 'When Legends Rise',
            attached_URL: 'https://www.vibbidi.net/single/godsmack/when-legends-rise',
            content:
                '<a href="https://www.vibbidi.net/single/godsmack/when-legends-rise">When Legends Rise</a>',
            hashtag: '#TaylorSwift #Pop #Reputation #Endgame',
        });
    }
    return data;
};
export const generateData = () => {
    const data = [];
    // eslint-disable-next-line
    for (let i = 0; i <= 50; i++) {
        data.push({
            id: `A8C040AA49124C119EB8AB5D7D9F720${i}`,
            UUID: 'A8C040AA49124C119EB8AB5D7D9F7201',
            main_title:
                'Nicki Minajs ‘Queen’ Contains Much To Like, Yet Her Empire Remains Under Siege',
            sub_title: 'Nicki Minaj Reps The New York Roots, Bypassing The Barbie Shit',
            content:
                "Many of the best music in Queen showcases clever, hungry lyricism over mean New York beats. Concussive boom-bap era styles rule, like the battle attitude on the dis-everybody beat “Barbie Dreams”, which samples The Notorious B.I.G.’s “Just Playing (Dreams)”. Nicki, trying to find someone worthy of giving babies to (her words), is pretty nonplussed by what’s on the market, spitting “all these Bow Wow challenge niggas lying and shit / man, these Fetty Wap niggas stay eyeing my shit / drake worth a hundred milli, always buying me shit / but I don't know if the pussy wet or if he crying and shit.” On another upbeat NY joint, “Chun- Li”, one can actually dance a routine to the drum rhythms, or marvel at the steady bars and creative voices Nicki Minaj employs to get her vicious points across; “These birds copy every word, every inch / but gang gang got the hammer and the wrench / I pull up in that quarter milli off the lot / oh now she tryna be friends like I forgot.” Yes, mad copycats out there.At the end of the day though, many rappers have adopted her frenetic, nasally, theatrical style – when they can actually pull it off.Minaj never misses a step when she raps – whether you enjoy her flow or not.",
            youtube_link: 'https://www.youtube.com/watch?v=j440-D5JhjI',
            single_page: '/single/nickiminaj/chun-li',
            status: 'approve',
            comments: null,
            owner: 'vanpn',
        });
    }
    return data;
};
export const generateDataAlbum = () => {
    const data = [];
    // eslint-disable-next-line
    for (let i = 0; i <= 3; i++) {
        data.push({
            UUID: `A8C040AA49124C119EB8AB5D7D9F720${i}`,
            album_name:
                'Nicki Minajs ‘Queen’ Contains Much To Like, Yet Her Empire Remains Under Siege',
            artist_name: 'Nicki Minaj Reps The New York Roots, Bypassing The Barbie Shit',
            vibbidi_url: 'https://www.youtube.com/watch?v=j440-D5JhjI',
        });
    }
    return data;
};
