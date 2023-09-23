import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, QueryList, ViewChildren, OnChanges, AfterViewInit } from '@angular/core';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { SportsService } from 'src/app/services/sports.service';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { Amplify } from 'aws-amplify';

@Component({
  selector: 'app-message-board',
  templateUrl: 'message-board.page.html',
  styleUrls: ['message-board.page.scss']
})
export class MessageBoardPage implements OnInit {

  onUpdateSportsGame: Subscription | null = null;
  data: any;
  baseballData: any = [];
  liveData: any = [];
  currentData: any = [];
  lastEvent: any = [];
  lastEventDescription;
  opponentName;
  currentHalfInning;

  halfInnings = ["Top 1st", "Bottom 1st", "Top 2nd", "Bottom 2nd", "Top 3rd", "Bottom 3rd", "Top 4th", "Bottom 4th", "Top 5th", "Bottom 5th", "Top 6th", "Bottom 6th", "Top 7th", "Bottom 7th", "Top 8th", "Bottom 8th", "Top 9th", "Bottom 9th"]

  constructor(
    private api: APIService,
    private sportsService: SportsService,
  ) {}

  refresh(){
    window.location.reload();
  }


  async ngOnInit() {
    this.startSubscriptions();
    await this.getSportsData();
    console.log(this.baseballData)
  }

  startSubscriptions() {
    this.onUpdateSportsGame = <Subscription>(
      this.api.OnUpdateSportsGameListener().subscribe({
        next: async (event: any) => {
          const data = event;

          this.baseballData.map((game, index) => {
            if(data.value.data.onUpdateSportsGame.id === game.id){
              this.baseballData[index] = data.value.data.onUpdateSportsGame;
              this.baseballData[index].initialGameInfo = JSON.parse(this.baseballData[index].initialGameInfo)
              this.baseballData[index].currentHalfInning = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.initialGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.initialGameInfo[0].currentPlay.about.inning.toString()) : null;
            }
          })

          console.log(this.baseballData)
          // this.baseballData = [data.value.data.onUpdateSportsGame];
          // console.log(this.baseballData)
          // this.currentData = JSON.parse(this.baseballData[0].liveGameData)
          // console.log(this.currentData)

          // this.lastEvent = this.liveData[0]
          // this.lastEventDescription = this.liveData[0].des ? this.liveData[0].des : this.lastEventDescription;
          // console.log(this.lastEvent)
        }
      })
    )
  }

  async ngOnDestroy() {
    if (this.onUpdateSportsGame) {
      await this.onUpdateSportsGame.unsubscribe();
    }
  }


  async getSportsData(){

    this.baseballData.map(async game => {
      game.initialGameInfo = await JSON.parse(game.initialGameInfo)
      game.liveGameData = await JSON.parse(game.liveGameData)
      game.currentHalfInning = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.initialGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.initialGameInfo[0].currentPlay.about.inning.toString()) : null;
      game.lastEvent = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.playEvents[game.initialGameInfo[0].currentPlay.playEvents.length - 1].details.description : null;
    })
    // await this.api.SportsGamesBySportAndStartTime("baseball", null, ModelSortDirection.DESC).then(data => {
    //   this.baseballData = data.items;
    //   console.log(this.baseballData)
    //   this.baseballData.map(async game => {
    //     game.initialGameInfo = await JSON.parse(game.initialGameInfo)
    //     game.liveGameData = await JSON.parse(game.liveGameData)
    //     game.currentHalfInning = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.initialGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.initialGameInfo[0].currentPlay.about.inning.toString()) : null;
    //     game.lastEvent = game.gameStatus === 'In Progress' ? game.initialGameInfo[0].currentPlay.playEvents[game.initialGameInfo[0].currentPlay.playEvents.length - 1].details.description : null;
    //   })
    // })

    this.baseballData = [
      {
        "__typename": "SportsGame",
        "id": "716489",
        "sport": null,
        "homeTeam": "Cleveland Guardians",
        "awayTeam": "Baltimore Orioles",
        "gameStatus": "In Progress",
        "homeTeamWins": "72",
        "homeTeamLosses": "81",
        "awayTeamWins": "95",
        "awayTeamLosses": "57",
        "initialGameInfo": [
          {
            "initialGameData": {
              "venue": {
                "name": "Progressive Field",
                "link": "/api/v1/venues/5",
                "timeZone": {
                  "offset": -4,
                  "tz": "EDT",
                  "offsetAtGameTime": -4,
                  "id": "America/New_York"
                },
                "active": true,
                "season": "2023",
                "location": {
                  "elevation": 653,
                  "country": "USA",
                  "city": "Cleveland",
                  "phone": "(216) 420-4200",
                  "address1": "2401 Ontario Street",
                  "postalCode": "44115",
                  "defaultCoordinates": {
                    "latitude": 41.495861,
                    "longitude": -81.685255
                  },
                  "state": "Ohio",
                  "azimuthAngle": 0,
                  "stateAbbrev": "OH"
                },
                "id": 5,
                "fieldInfo": {
                  "turfType": "Grass",
                  "leftCenter": 410,
                  "leftLine": 325,
                  "left": 370,
                  "rightCenter": 375,
                  "rightLine": 325,
                  "roofType": "Open",
                  "center": 405,
                  "capacity": 34788
                }
              },
              "game": {
                "doubleHeader": "N",
                "calendarEventID": "14-716489-2023-09-21",
                "gameNumber": 1,
                "season": "2023",
                "pk": 716489,
                "id": "2023/09/21/balmlb-clemlb-1",
                "tiebreaker": "N",
                "type": "R",
                "gamedayType": "P",
                "seasonDisplay": "2023"
              },
              "officialScorer": {
                "link": "/api/v1/people/501169",
                "fullName": "Bob Maver",
                "id": 501169
              },
              "teams": {
                "away": {
                  "teamName": "Orioles",
                  "venue": {
                    "name": "Oriole Park at Camden Yards",
                    "link": "/api/v1/venues/2",
                    "id": 2
                  },
                  "locationName": "Baltimore",
                  "firstYearOfPlay": "1901",
                  "league": {
                    "name": "American League",
                    "link": "/api/v1/league/103",
                    "id": 103
                  },
                  "clubName": "Orioles",
                  "link": "/api/v1/teams/110",
                  "teamCode": "bal",
                  "fileCode": "bal",
                  "active": true,
                  "allStarStatus": "N",
                  "springVenue": {
                    "link": "/api/v1/venues/2508",
                    "id": 2508
                  },
                  "abbreviation": "BAL",
                  "springLeague": {
                    "name": "Grapefruit League",
                    "link": "/api/v1/league/115",
                    "id": 115,
                    "abbreviation": "GL"
                  },
                  "division": {
                    "name": "American League East",
                    "link": "/api/v1/divisions/201",
                    "id": 201
                  },
                  "record": {
                    "divisionGamesBack": "-",
                    "wins": 95,
                    "conferenceGamesBack": "-",
                    "records": {},
                    "springLeagueGamesBack": "-",
                    "leagueGamesBack": "-",
                    "divisionLeader": false,
                    "losses": 57,
                    "wildCardGamesBack": "-",
                    "sportGamesBack": "-",
                    "leagueRecord": {
                      "wins": 95,
                      "pct": ".625",
                      "ties": 0,
                      "losses": 57
                    },
                    "gamesPlayed": 152,
                    "winningPercentage": ".625"
                  },
                  "name": "Baltimore Orioles",
                  "season": 2023,
                  "id": 110,
                  "shortName": "Baltimore",
                  "sport": {
                    "link": "/api/v1/sports/1",
                    "name": "Major League Baseball",
                    "id": 1
                  },
                  "franchiseName": "Baltimore"
                },
                "home": {
                  "teamName": "Guardians",
                  "venue": {
                    "name": "Progressive Field",
                    "link": "/api/v1/venues/5",
                    "id": 5
                  },
                  "locationName": "Cleveland",
                  "firstYearOfPlay": "1901",
                  "league": {
                    "name": "American League",
                    "link": "/api/v1/league/103",
                    "id": 103
                  },
                  "clubName": "Guardians",
                  "link": "/api/v1/teams/114",
                  "teamCode": "cle",
                  "fileCode": "cle",
                  "active": true,
                  "allStarStatus": "N",
                  "springVenue": {
                    "link": "/api/v1/venues/3834",
                    "id": 3834
                  },
                  "abbreviation": "CLE",
                  "springLeague": {
                    "name": "Cactus League",
                    "link": "/api/v1/league/114",
                    "id": 114,
                    "abbreviation": "CL"
                  },
                  "division": {
                    "name": "American League Central",
                    "link": "/api/v1/divisions/202",
                    "id": 202
                  },
                  "record": {
                    "divisionGamesBack": "-",
                    "wins": 72,
                    "conferenceGamesBack": "-",
                    "records": {},
                    "springLeagueGamesBack": "-",
                    "leagueGamesBack": "-",
                    "divisionLeader": false,
                    "losses": 81,
                    "wildCardGamesBack": "-",
                    "sportGamesBack": "-",
                    "leagueRecord": {
                      "wins": 72,
                      "pct": ".471",
                      "ties": 0,
                      "losses": 81
                    },
                    "gamesPlayed": 153,
                    "winningPercentage": ".471"
                  },
                  "name": "Cleveland Guardians",
                  "season": 2023,
                  "id": 114,
                  "shortName": "Cleveland",
                  "sport": {
                    "link": "/api/v1/sports/1",
                    "name": "Major League Baseball",
                    "id": 1
                  },
                  "franchiseName": "Cleveland"
                }
              },
              "players": {
                "ID647304": {
                  "isPlayer": true,
                  "lastInitName": "Naylor, J",
                  "lastName": "Naylor",
                  "birthStateProvince": "ON",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-05-24",
                  "link": "/api/v1/people/647304",
                  "nameFirstLast": "Josh Naylor",
                  "primaryPosition": {
                    "code": "3",
                    "name": "First Base",
                    "type": "Infielder",
                    "abbreviation": "1B"
                  },
                  "currentAge": 26,
                  "firstLastName": "Josh Naylor",
                  "lastFirstName": "Naylor, Josh",
                  "birthCountry": "Canada",
                  "useName": "Josh",
                  "id": 647304,
                  "fullFMLName": "Joshua-Douglas James Naylor",
                  "height": "5' 11\"",
                  "nameSlug": "josh-naylor-647304",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Naylz",
                  "draftYear": 2015,
                  "boxscoreName": "Naylor, J",
                  "fullName": "Josh Naylor",
                  "weight": 250,
                  "active": true,
                  "birthCity": "Mississauga",
                  "initLastName": "J Naylor",
                  "strikeZoneTop": 3.2,
                  "birthDate": "1997-06-22",
                  "primaryNumber": "22",
                  "firstName": "Joshua-Douglas",
                  "fullLFMName": "Naylor, Joshua-Douglas James",
                  "useLastName": "Naylor",
                  "middleName": "James",
                  "strikeZoneBottom": 1.51,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID624428": {
                  "isPlayer": true,
                  "lastInitName": "Frazier, A",
                  "lastName": "Frazier",
                  "birthStateProvince": "GA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2016-06-24",
                  "link": "/api/v1/people/624428",
                  "nameFirstLast": "Adam Frazier",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 31,
                  "firstLastName": "Adam Frazier",
                  "lastFirstName": "Frazier, Adam",
                  "birthCountry": "USA",
                  "useName": "Adam",
                  "id": 624428,
                  "fullFMLName": "Adam Timothy Frazier",
                  "height": "5' 10\"",
                  "nameSlug": "adam-frazier-624428",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Fraz",
                  "draftYear": 2013,
                  "boxscoreName": "Frazier",
                  "fullName": "Adam Frazier",
                  "weight": 180,
                  "active": true,
                  "birthCity": "Athens",
                  "initLastName": "A Frazier",
                  "strikeZoneTop": 3.18,
                  "birthDate": "1991-12-14",
                  "primaryNumber": "12",
                  "firstName": "Adam",
                  "fullLFMName": "Frazier, Adam Timothy",
                  "useLastName": "Frazier",
                  "middleName": "Timothy",
                  "strikeZoneBottom": 1.45,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID669212": {
                  "isPlayer": true,
                  "lastInitName": "Morgan, E",
                  "lastName": "Morgan",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2021-05-28",
                  "link": "/api/v1/people/669212",
                  "nameFirstLast": "Eli Morgan",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Eli Morgan",
                  "lastFirstName": "Morgan, Eli",
                  "birthCountry": "USA",
                  "useName": "Eli",
                  "id": 669212,
                  "fullFMLName": "Elijah Allan Morgan",
                  "height": "5' 10\"",
                  "nameSlug": "eli-morgan-669212",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Morgan",
                  "fullName": "Eli Morgan",
                  "weight": 190,
                  "active": true,
                  "birthCity": "Rancho Palos Verdes",
                  "initLastName": "E Morgan",
                  "strikeZoneTop": 3.301,
                  "birthDate": "1996-05-13",
                  "primaryNumber": "49",
                  "firstName": "Elijah",
                  "fullLFMName": "Morgan, Elijah Allan",
                  "useLastName": "Morgan",
                  "middleName": "Allan",
                  "strikeZoneBottom": 1.504,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID657508": {
                  "isPlayer": true,
                  "lastInitName": "Baumann, M",
                  "lastName": "Baumann",
                  "birthStateProvince": "MN",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2021-09-07",
                  "link": "/api/v1/people/657508",
                  "nameFirstLast": "Mike Baumann",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "Mike Baumann",
                  "lastFirstName": "Baumann, Mike",
                  "birthCountry": "USA",
                  "useName": "Mike",
                  "id": 657508,
                  "fullFMLName": "Michael Thomas Baumann",
                  "height": "6' 4\"",
                  "nameSlug": "mike-baumann-657508",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Baumann",
                  "fullName": "Mike Baumann",
                  "weight": 240,
                  "active": true,
                  "birthCity": "Mahtomedi",
                  "initLastName": "M Baumann",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1995-09-10",
                  "primaryNumber": "53",
                  "firstName": "Michael",
                  "fullLFMName": "Baumann, Michael Thomas",
                  "useLastName": "Baumann",
                  "middleName": "Thomas",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID622761": {
                  "isPlayer": true,
                  "lastInitName": "Mateo, J",
                  "lastName": "Mateo",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2020-08-13",
                  "link": "/api/v1/people/622761",
                  "nameFirstLast": "Jorge Mateo",
                  "primaryPosition": {
                    "code": "6",
                    "name": "Shortstop",
                    "type": "Infielder",
                    "abbreviation": "SS"
                  },
                  "currentAge": 28,
                  "firstLastName": "Jorge Mateo",
                  "lastFirstName": "Mateo, Jorge",
                  "birthCountry": "Dominican Republic",
                  "useName": "Jorge",
                  "id": 622761,
                  "fullFMLName": "Jorge Luis Mateo",
                  "height": "6' 1\"",
                  "nameSlug": "jorge-mateo-622761",
                  "pronunciation": "ma-TAY-oh",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Mateo",
                  "fullName": "Jorge Mateo",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Santo Domingo Oeste",
                  "initLastName": "J Mateo",
                  "strikeZoneTop": 3.38,
                  "birthDate": "1995-06-23",
                  "primaryNumber": "3",
                  "firstName": "Jorge",
                  "fullLFMName": "Mateo, Jorge Luis",
                  "useLastName": "Mateo",
                  "middleName": "Luis",
                  "strikeZoneBottom": 1.62,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID683002": {
                  "isPlayer": true,
                  "lastInitName": "Henderson, G",
                  "lastName": "Henderson",
                  "birthStateProvince": "AL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-08-31",
                  "link": "/api/v1/people/683002",
                  "nameFirstLast": "Gunnar Henderson",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 22,
                  "firstLastName": "Gunnar Henderson",
                  "lastFirstName": "Henderson, Gunnar",
                  "birthCountry": "USA",
                  "useName": "Gunnar",
                  "id": 683002,
                  "fullFMLName": "Gunnar Randal Henderson",
                  "height": "6' 3\"",
                  "nameSlug": "gunnar-henderson-683002",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Henderson",
                  "fullName": "Gunnar Henderson",
                  "weight": 220,
                  "active": true,
                  "birthCity": "Montgomery",
                  "initLastName": "G Henderson",
                  "strikeZoneTop": 3.68,
                  "birthDate": "2001-06-29",
                  "primaryNumber": "2",
                  "firstName": "Gunnar",
                  "fullLFMName": "Henderson, Gunnar Randal",
                  "useLastName": "Henderson",
                  "middleName": "Randal",
                  "strikeZoneBottom": 1.72,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID663630": {
                  "isPlayer": true,
                  "lastInitName": "McKenna, R",
                  "lastName": "McKenna",
                  "birthStateProvince": "OR",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2021-04-05",
                  "link": "/api/v1/people/663630",
                  "nameFirstLast": "Ryan McKenna",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 26,
                  "firstLastName": "Ryan McKenna",
                  "lastFirstName": "McKenna, Ryan",
                  "birthCountry": "USA",
                  "useName": "Ryan",
                  "id": 663630,
                  "fullFMLName": "Ryan Shea McKenna",
                  "height": "5' 11\"",
                  "nameSlug": "ryan-mckenna-663630",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2015,
                  "boxscoreName": "McKenna",
                  "fullName": "Ryan McKenna",
                  "weight": 195,
                  "active": true,
                  "birthCity": "Grants Pass",
                  "initLastName": "R McKenna",
                  "strikeZoneTop": 3.4,
                  "birthDate": "1997-02-14",
                  "primaryNumber": "26",
                  "firstName": "Ryan",
                  "fullLFMName": "McKenna, Ryan Shea",
                  "useLastName": "McKenna",
                  "middleName": "Shea",
                  "strikeZoneBottom": 1.61,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID680694": {
                  "isPlayer": true,
                  "lastInitName": "Bradish, K",
                  "lastName": "Bradish",
                  "birthStateProvince": "AZ",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-04-29",
                  "link": "/api/v1/people/680694",
                  "nameFirstLast": "Kyle Bradish",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Kyle Bradish",
                  "lastFirstName": "Bradish, Kyle",
                  "birthCountry": "USA",
                  "useName": "Kyle",
                  "id": 680694,
                  "fullFMLName": "Kyle Edward Bradish",
                  "height": "6' 3\"",
                  "nameSlug": "kyle-bradish-680694",
                  "pronunciation": "BRAD-ish",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Bradish",
                  "fullName": "Kyle Bradish",
                  "weight": 215,
                  "active": true,
                  "birthCity": "Peoria",
                  "initLastName": "K Bradish",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1996-09-12",
                  "primaryNumber": "39",
                  "firstName": "Kyle",
                  "fullLFMName": "Bradish, Kyle Edward",
                  "useLastName": "Bradish",
                  "middleName": "Edward",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID686823": {
                  "isPlayer": true,
                  "lastInitName": "Brennan, W",
                  "lastName": "Brennan",
                  "birthStateProvince": "CO",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-09-21",
                  "link": "/api/v1/people/686823",
                  "nameFirstLast": "Will Brennan",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 25,
                  "firstLastName": "Will Brennan",
                  "lastFirstName": "Brennan, Will",
                  "birthCountry": "USA",
                  "useName": "Will",
                  "id": 686823,
                  "fullFMLName": "William Daniel Brennan",
                  "height": "6' 0\"",
                  "nameSlug": "will-brennan-686823",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Brennan",
                  "fullName": "Will Brennan",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Colorado Springs",
                  "initLastName": "W Brennan",
                  "strikeZoneTop": 3.45,
                  "birthDate": "1998-02-02",
                  "primaryNumber": "17",
                  "firstName": "William",
                  "fullLFMName": "Brennan, William Daniel",
                  "useLastName": "Brennan",
                  "middleName": "Daniel",
                  "strikeZoneBottom": 1.57,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID661403": {
                  "isPlayer": true,
                  "lastInitName": "Clase, E",
                  "lastName": "Clase",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-08-04",
                  "link": "/api/v1/people/661403",
                  "nameFirstLast": "Emmanuel Clase",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 25,
                  "firstLastName": "Emmanuel Clase",
                  "lastFirstName": "Clase, Emmanuel",
                  "birthCountry": "Dominican Republic",
                  "useName": "Emmanuel",
                  "id": 661403,
                  "fullFMLName": "Emmanuel Clase",
                  "height": "6' 2\"",
                  "nameMatrilineal": "De La Cruz",
                  "nameSlug": "emmanuel-clase-661403",
                  "pronunciation": "clas-A",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Clase",
                  "fullName": "Emmanuel Clase",
                  "weight": 206,
                  "active": true,
                  "birthCity": "Rio San Juan",
                  "initLastName": "E Clase",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1998-03-18",
                  "primaryNumber": "48",
                  "firstName": "Emmanuel",
                  "fullLFMName": "Clase, Emmanuel",
                  "useLastName": "Clase",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID680570": {
                  "isPlayer": true,
                  "lastInitName": "Rodriguez, G",
                  "lastName": "Rodriguez",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-04-05",
                  "link": "/api/v1/people/680570",
                  "nameFirstLast": "Grayson Rodriguez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 23,
                  "firstLastName": "Grayson Rodriguez",
                  "lastFirstName": "Rodriguez, Grayson",
                  "birthCountry": "USA",
                  "useName": "Grayson",
                  "id": 680570,
                  "fullFMLName": "Grayson Greer Rodriguez",
                  "height": "6' 5\"",
                  "nameSlug": "grayson-rodriguez-680570",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Rodriguez, G",
                  "fullName": "Grayson Rodriguez",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Houston",
                  "initLastName": "G Rodriguez",
                  "strikeZoneTop": 3.575,
                  "birthDate": "1999-11-16",
                  "primaryNumber": "30",
                  "firstName": "Grayson",
                  "fullLFMName": "Rodriguez, Grayson Greer",
                  "useLastName": "Rodriguez",
                  "middleName": "Greer",
                  "strikeZoneBottom": 1.681,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID665926": {
                  "isPlayer": true,
                  "lastInitName": "Giménez, A",
                  "lastName": "Gimenez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2020-07-24",
                  "link": "/api/v1/people/665926",
                  "nameFirstLast": "Andres Gimenez",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 25,
                  "firstLastName": "Andrés Giménez",
                  "lastFirstName": "Giménez, Andrés",
                  "birthCountry": "Venezuela",
                  "useName": "Andres",
                  "id": 665926,
                  "fullFMLName": "Andrés Alfonso Giménez",
                  "height": "5' 11\"",
                  "nameMatrilineal": "Osorio",
                  "nameSlug": "andres-gimenez-665926",
                  "pronunciation": "he-MEN-ez",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Gimenez",
                  "fullName": "Andres Gimenez",
                  "weight": 161,
                  "active": true,
                  "birthCity": "Barquisimeto",
                  "initLastName": "A Gimenez",
                  "strikeZoneTop": 3.24,
                  "birthDate": "1998-09-04",
                  "primaryNumber": "0",
                  "firstName": "Andres",
                  "fullLFMName": "Giménez, Andrés Alfonso",
                  "useLastName": "Giménez",
                  "middleName": "Alfonso",
                  "strikeZoneBottom": 1.48,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID677008": {
                  "isPlayer": true,
                  "lastInitName": "Kjerstad, H",
                  "lastName": "Kjerstad",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-09-14",
                  "link": "/api/v1/people/677008",
                  "nameFirstLast": "Heston Kjerstad",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 24,
                  "firstLastName": "Heston Kjerstad",
                  "lastFirstName": "Kjerstad, Heston",
                  "birthCountry": "USA",
                  "useName": "Heston",
                  "id": 677008,
                  "fullFMLName": "Heston Sawyer Kjerstad",
                  "height": "6' 3\"",
                  "nameSlug": "heston-kjerstad-677008",
                  "pronunciation": "kerr-stad",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2020,
                  "boxscoreName": "Kjerstad",
                  "fullName": "Heston Kjerstad",
                  "weight": 205,
                  "active": true,
                  "birthCity": "Amarillo",
                  "initLastName": "H Kjerstad",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1999-02-12",
                  "primaryNumber": "13",
                  "firstName": "Heston",
                  "fullLFMName": "Kjerstad, Heston Sawyer",
                  "useLastName": "Kjerstad",
                  "middleName": "Sawyer",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID656427": {
                  "isPlayer": true,
                  "lastInitName": "Flaherty, J",
                  "lastName": "Flaherty",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-09-01",
                  "link": "/api/v1/people/656427",
                  "nameFirstLast": "Jack Flaherty",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Jack Flaherty",
                  "lastFirstName": "Flaherty, Jack",
                  "birthCountry": "USA",
                  "useName": "Jack",
                  "id": 656427,
                  "fullFMLName": "Jack Rafe Flaherty",
                  "height": "6' 4\"",
                  "nameSlug": "jack-flaherty-656427",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Flare",
                  "draftYear": 2014,
                  "boxscoreName": "Flaherty",
                  "fullName": "Jack Flaherty",
                  "weight": 225,
                  "active": true,
                  "birthCity": "Burbank",
                  "initLastName": "J Flaherty",
                  "strikeZoneTop": 3.48,
                  "birthDate": "1995-10-15",
                  "primaryNumber": "15",
                  "firstName": "Jack",
                  "fullLFMName": "Flaherty, Jack Rafe",
                  "useLastName": "Flaherty",
                  "middleName": "Rafe",
                  "strikeZoneBottom": 1.62,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID675540": {
                  "isPlayer": true,
                  "lastInitName": "Curry, X",
                  "lastName": "Curry",
                  "birthStateProvince": "SC",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-08-15",
                  "link": "/api/v1/people/675540",
                  "nameFirstLast": "Xzavion Curry",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 25,
                  "firstLastName": "Xzavion Curry",
                  "lastFirstName": "Curry, Xzavion",
                  "birthCountry": "USA",
                  "useName": "Xzavion",
                  "id": 675540,
                  "fullFMLName": "Xzavion Rashan Curry",
                  "height": "6' 0\"",
                  "nameSlug": "xzavion-curry-675540",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Curry",
                  "fullName": "Xzavion Curry",
                  "weight": 195,
                  "active": true,
                  "birthCity": "Orangeburg",
                  "initLastName": "X Curry",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1998-07-27",
                  "primaryNumber": "44",
                  "firstName": "Xzavion",
                  "fullLFMName": "Curry, Xzavion Rashan",
                  "useLastName": "Curry",
                  "middleName": "Rashan",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID543305": {
                  "isPlayer": true,
                  "lastInitName": "Hicks, A",
                  "lastName": "Hicks",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-04-01",
                  "link": "/api/v1/people/543305",
                  "nameFirstLast": "Aaron Hicks",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 33,
                  "firstLastName": "Aaron Hicks",
                  "lastFirstName": "Hicks, Aaron",
                  "birthCountry": "USA",
                  "useName": "Aaron",
                  "id": 543305,
                  "fullFMLName": "Aaron Michael Hicks",
                  "height": "6' 1\"",
                  "nameSlug": "aaron-hicks-543305",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Hicksie",
                  "draftYear": 2008,
                  "boxscoreName": "Hicks, A",
                  "fullName": "Aaron Hicks",
                  "weight": 205,
                  "active": true,
                  "birthCity": "San Pedro",
                  "initLastName": "A Hicks",
                  "strikeZoneTop": 3.63,
                  "birthDate": "1989-10-02",
                  "primaryNumber": "34",
                  "firstName": "Aaron",
                  "fullLFMName": "Hicks, Aaron Michael",
                  "useLastName": "Hicks",
                  "middleName": "Michael",
                  "strikeZoneBottom": 1.76,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID672356": {
                  "isPlayer": true,
                  "lastInitName": "Arias, G",
                  "lastName": "Arias",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-04-20",
                  "link": "/api/v1/people/672356",
                  "nameFirstLast": "Gabriel Arias",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 23,
                  "firstLastName": "Gabriel Arias",
                  "lastFirstName": "Arias, Gabriel",
                  "birthCountry": "Venezuela",
                  "useName": "Gabriel",
                  "id": 672356,
                  "fullFMLName": "Gabriel Arias",
                  "height": "6' 1\"",
                  "nameMatrilineal": "Gomez",
                  "nameSlug": "gabriel-arias-672356",
                  "pronunciation": "GAH-bree-ehl AHR-ee-ahs",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Arias, G",
                  "fullName": "Gabriel Arias",
                  "weight": 217,
                  "active": true,
                  "birthCity": "La Victoria",
                  "initLastName": "G Arias",
                  "strikeZoneTop": 3.45,
                  "birthDate": "2000-02-27",
                  "primaryNumber": "13",
                  "firstName": "Gabriel",
                  "fullLFMName": "Arias, Gabriel",
                  "useLastName": "Arias",
                  "middleName": "Alejandro",
                  "strikeZoneBottom": 1.55,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID666310": {
                  "isPlayer": true,
                  "lastInitName": "Naylor, B",
                  "lastName": "Naylor",
                  "birthStateProvince": "ON",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-10-01",
                  "link": "/api/v1/people/666310",
                  "nameFirstLast": "Bo Naylor",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 23,
                  "firstLastName": "Bo Naylor",
                  "lastFirstName": "Naylor, Bo",
                  "birthCountry": "Canada",
                  "useName": "Bo",
                  "id": 666310,
                  "fullFMLName": "Noah G. Naylor",
                  "height": "6' 0\"",
                  "nameSlug": "bo-naylor-666310",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Bo",
                  "draftYear": 2018,
                  "boxscoreName": "Naylor, B",
                  "fullName": "Bo Naylor",
                  "weight": 205,
                  "active": true,
                  "birthCity": "Mississauga",
                  "initLastName": "B Naylor",
                  "strikeZoneTop": 3.42,
                  "birthDate": "2000-02-21",
                  "primaryNumber": "23",
                  "firstName": "Noah",
                  "fullLFMName": "Naylor, Noah G.",
                  "useLastName": "Naylor",
                  "middleName": "G.",
                  "strikeZoneBottom": 1.56,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID681807": {
                  "isPlayer": true,
                  "lastInitName": "Fry, D",
                  "lastName": "Fry",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-05-01",
                  "link": "/api/v1/people/681807",
                  "nameFirstLast": "David Fry",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 27,
                  "firstLastName": "David Fry",
                  "lastFirstName": "Fry, David",
                  "birthCountry": "USA",
                  "useName": "David",
                  "id": 681807,
                  "fullFMLName": "David  Fry",
                  "height": "6' 0\"",
                  "nameSlug": "david-fry-681807",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Fry",
                  "fullName": "David Fry",
                  "weight": 215,
                  "active": true,
                  "birthCity": "Colleyville",
                  "initLastName": "D Fry",
                  "strikeZoneTop": 3.35,
                  "birthDate": "1995-11-20",
                  "primaryNumber": "12",
                  "firstName": "David",
                  "fullLFMName": "Fry, David",
                  "useLastName": "Fry",
                  "strikeZoneBottom": 1.56,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID602104": {
                  "isPlayer": true,
                  "lastInitName": "Urías, R",
                  "lastName": "Urias",
                  "birthStateProvince": "SO",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2020-08-20",
                  "link": "/api/v1/people/602104",
                  "nameFirstLast": "Ramon Urias",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 29,
                  "firstLastName": "Ramón Urías",
                  "lastFirstName": "Urías, Ramón",
                  "birthCountry": "Mexico",
                  "useName": "Ramon",
                  "id": 602104,
                  "fullFMLName": "Ramón Francisco Urías",
                  "height": "5' 10\"",
                  "nameMatrilineal": "Figueroa",
                  "nameSlug": "ramon-urias-602104",
                  "pronunciation": "Uoo-REE-ahs",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Urías, R",
                  "fullName": "Ramon Urias",
                  "weight": 185,
                  "active": true,
                  "birthCity": "Magdalena de Kino",
                  "initLastName": "R Urías",
                  "strikeZoneTop": 3.12,
                  "birthDate": "1994-06-03",
                  "primaryNumber": "29",
                  "firstName": "Ramon",
                  "fullLFMName": "Urías, Ramón Francisco",
                  "useLastName": "Urías",
                  "middleName": "Francisco",
                  "strikeZoneBottom": 1.47,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID608070": {
                  "isPlayer": true,
                  "lastInitName": "Ramírez, J",
                  "lastName": "Ramirez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-09-01",
                  "link": "/api/v1/people/608070",
                  "nameFirstLast": "Jose Ramirez",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 31,
                  "firstLastName": "José Ramírez",
                  "lastFirstName": "Ramírez, José",
                  "birthCountry": "Dominican Republic",
                  "useName": "Jose",
                  "id": 608070,
                  "fullFMLName": "José Enrique Ramírez",
                  "height": "5' 9\"",
                  "nameSlug": "jose-ramirez-608070",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Enriquito",
                  "boxscoreName": "Ramírez, Jo",
                  "fullName": "Jose Ramirez",
                  "weight": 190,
                  "active": true,
                  "birthCity": "Bani",
                  "initLastName": "J Ramírez",
                  "strikeZoneTop": 3.37,
                  "birthDate": "1992-09-17",
                  "primaryNumber": "11",
                  "firstName": "Jose",
                  "fullLFMName": "Ramírez, José Enrique",
                  "useLastName": "Ramírez",
                  "middleName": "Enrique",
                  "strikeZoneBottom": 1.56,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID594777": {
                  "isPlayer": true,
                  "lastInitName": "Calhoun, K",
                  "lastName": "Calhoun",
                  "birthStateProvince": "AZ",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2012-05-22",
                  "link": "/api/v1/people/594777",
                  "nameFirstLast": "Kole Calhoun",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 35,
                  "firstLastName": "Kole Calhoun",
                  "lastFirstName": "Calhoun, Kole",
                  "birthCountry": "USA",
                  "useName": "Kole",
                  "id": 594777,
                  "fullFMLName": "Kole Alan Calhoun",
                  "height": "5' 10\"",
                  "nameSlug": "kole-calhoun-594777",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Koleski",
                  "draftYear": 2010,
                  "boxscoreName": "Calhoun",
                  "fullName": "Kole Calhoun",
                  "weight": 205,
                  "active": true,
                  "birthCity": "Tempe",
                  "initLastName": "K Calhoun",
                  "strikeZoneTop": 2.95,
                  "birthDate": "1987-10-14",
                  "primaryNumber": "56",
                  "firstName": "Kole",
                  "fullLFMName": "Calhoun, Kole Alan",
                  "useLastName": "Calhoun",
                  "middleName": "Alan",
                  "strikeZoneBottom": 1.42,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID680757": {
                  "isPlayer": true,
                  "lastInitName": "Kwan, S",
                  "lastName": "Kwan",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2022-04-07",
                  "link": "/api/v1/people/680757",
                  "nameFirstLast": "Steven Kwan",
                  "primaryPosition": {
                    "code": "7",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "LF"
                  },
                  "currentAge": 26,
                  "firstLastName": "Steven Kwan",
                  "lastFirstName": "Kwan, Steven",
                  "birthCountry": "USA",
                  "useName": "Steven",
                  "id": 680757,
                  "fullFMLName": "Steven  Kwan",
                  "height": "5' 9\"",
                  "nameSlug": "steven-kwan-680757",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Kwan",
                  "fullName": "Steven Kwan",
                  "weight": 170,
                  "active": true,
                  "birthCity": "Los Gatos",
                  "initLastName": "S Kwan",
                  "strikeZoneTop": 3.27,
                  "birthDate": "1997-09-05",
                  "primaryNumber": "38",
                  "firstName": "Steven",
                  "fullLFMName": "Kwan, Steven ",
                  "useLastName": "Kwan",
                  "strikeZoneBottom": 1.5,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID625643": {
                  "isPlayer": true,
                  "lastInitName": "López, R",
                  "lastName": "Lopez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2016-07-19",
                  "link": "/api/v1/people/625643",
                  "nameFirstLast": "Reynaldo Lopez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Reynaldo López",
                  "lastFirstName": "López, Reynaldo",
                  "birthCountry": "Dominican Republic",
                  "useName": "Reynaldo",
                  "id": 625643,
                  "fullFMLName": "Reynaldo Starling López",
                  "height": "6' 1\"",
                  "nameMatrilineal": "Kely",
                  "nameSlug": "reynaldo-lopez-625643",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Rey",
                  "boxscoreName": "López, R",
                  "fullName": "Reynaldo Lopez",
                  "weight": 225,
                  "active": true,
                  "birthCity": "San Pedro de Macoris",
                  "initLastName": "R López",
                  "strikeZoneTop": 3.411,
                  "birthDate": "1994-01-04",
                  "primaryNumber": "40",
                  "firstName": "Reynaldo",
                  "fullLFMName": "López, Reynaldo Starling",
                  "useLastName": "López",
                  "middleName": "Starling",
                  "strikeZoneBottom": 1.565,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID543510": {
                  "isPlayer": true,
                  "lastInitName": "McCann, J",
                  "lastName": "McCann",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-09-01",
                  "link": "/api/v1/people/543510",
                  "nameFirstLast": "James McCann",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 33,
                  "firstLastName": "James McCann",
                  "lastFirstName": "McCann, James",
                  "birthCountry": "USA",
                  "useName": "James",
                  "id": 543510,
                  "fullFMLName": "James Thomas McCann",
                  "height": "6' 3\"",
                  "nameSlug": "james-mccann-543510",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "McCannon",
                  "draftYear": 2011,
                  "boxscoreName": "McCann",
                  "fullName": "James McCann",
                  "weight": 235,
                  "active": true,
                  "birthCity": "Santa Barbara",
                  "initLastName": "J McCann",
                  "strikeZoneTop": 3.35,
                  "birthDate": "1990-06-13",
                  "primaryNumber": "27",
                  "firstName": "James",
                  "fullLFMName": "McCann, James Thomas",
                  "useLastName": "McCann",
                  "middleName": "Thomas",
                  "strikeZoneBottom": 1.49,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID502043": {
                  "isPlayer": true,
                  "lastInitName": "Gibson, K",
                  "lastName": "Gibson",
                  "birthStateProvince": "IN",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-06-29",
                  "link": "/api/v1/people/502043",
                  "nameFirstLast": "Kyle Gibson",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 35,
                  "firstLastName": "Kyle Gibson",
                  "lastFirstName": "Gibson, Kyle",
                  "birthCountry": "USA",
                  "useName": "Kyle",
                  "id": 502043,
                  "fullFMLName": "Kyle Benjamin Gibson",
                  "height": "6' 6\"",
                  "nameSlug": "kyle-gibson-502043",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Gibby",
                  "draftYear": 2009,
                  "boxscoreName": "Gibson",
                  "fullName": "Kyle Gibson",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Greenfield",
                  "initLastName": "K Gibson",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1987-10-23",
                  "primaryNumber": "48",
                  "firstName": "Kyle",
                  "fullLFMName": "Gibson, Kyle Benjamin",
                  "useLastName": "Gibson",
                  "middleName": "Benjamin",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID665152": {
                  "isPlayer": true,
                  "lastInitName": "Kremer, D",
                  "lastName": "Kremer",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2020-09-06",
                  "link": "/api/v1/people/665152",
                  "nameFirstLast": "Dean Kremer",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Dean Kremer",
                  "lastFirstName": "Kremer, Dean",
                  "birthCountry": "USA",
                  "useName": "Dean",
                  "id": 665152,
                  "fullFMLName": "Dean Junior Kremer",
                  "height": "6' 2\"",
                  "nameSlug": "dean-kremer-665152",
                  "pronunciation": "KRAY-mer",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2016,
                  "boxscoreName": "Kremer",
                  "fullName": "Dean Kremer",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Stockton",
                  "initLastName": "D Kremer",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1996-01-07",
                  "primaryNumber": "64",
                  "firstName": "Dean",
                  "fullLFMName": "Kremer, Dean Junior",
                  "useLastName": "Kremer",
                  "middleName": "Junior",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID675916": {
                  "isPlayer": true,
                  "lastInitName": "Karinchak, J",
                  "lastName": "Karinchak",
                  "birthStateProvince": "NY",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2019-09-14",
                  "link": "/api/v1/people/675916",
                  "nameFirstLast": "James Karinchak",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "James Karinchak",
                  "lastFirstName": "Karinchak, James",
                  "birthCountry": "USA",
                  "useName": "James",
                  "id": 675916,
                  "fullFMLName": "James Stephen Karinchak",
                  "height": "6' 3\"",
                  "nameSlug": "james-karinchak-675916",
                  "pronunciation": "karin-check",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Karinchak",
                  "fullName": "James Karinchak",
                  "weight": 215,
                  "active": true,
                  "birthCity": "Newburgh",
                  "initLastName": "J Karinchak",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1995-09-22",
                  "primaryNumber": "99",
                  "firstName": "James",
                  "fullLFMName": "Karinchak, James Stephen",
                  "useLastName": "Karinchak",
                  "middleName": "Stephen",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID680704": {
                  "isPlayer": true,
                  "lastInitName": "Sandlin, N",
                  "lastName": "Sandlin",
                  "birthStateProvince": "GA",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2021-05-01",
                  "link": "/api/v1/people/680704",
                  "nameFirstLast": "Nick Sandlin",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 26,
                  "firstLastName": "Nick Sandlin",
                  "lastFirstName": "Sandlin, Nick",
                  "birthCountry": "USA",
                  "useName": "Nick",
                  "id": 680704,
                  "fullFMLName": "Nick  Sandlin",
                  "height": "5' 11\"",
                  "nameSlug": "nick-sandlin-680704",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Sandlin",
                  "fullName": "Nick Sandlin",
                  "weight": 175,
                  "active": true,
                  "birthCity": "Evans",
                  "initLastName": "N Sandlin",
                  "strikeZoneTop": 3.319,
                  "birthDate": "1997-01-10",
                  "primaryNumber": "52",
                  "firstName": "Nick",
                  "fullLFMName": "Sandlin, Nick",
                  "useLastName": "Sandlin",
                  "strikeZoneBottom": 1.513,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID660261": {
                  "isPlayer": true,
                  "lastInitName": "Fujinami, S",
                  "lastName": "Fujinami",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-04-01",
                  "link": "/api/v1/people/660261",
                  "nameFirstLast": "Shintaro Fujinami",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Shintaro Fujinami",
                  "lastFirstName": "Fujinami, Shintaro",
                  "birthCountry": "Japan",
                  "useName": "Shintaro",
                  "id": 660261,
                  "fullFMLName": "Shintaro Fujinami",
                  "height": "6' 6\"",
                  "nameSlug": "shintaro-fujinami-660261",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Fujinami",
                  "fullName": "Shintaro Fujinami",
                  "weight": 180,
                  "active": true,
                  "birthCity": "Sakai",
                  "initLastName": "S Fujinami",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1994-04-12",
                  "primaryNumber": "14",
                  "firstName": "Shintaro",
                  "fullLFMName": "Fujinami, Shintaro",
                  "useLastName": "Fujinami",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID623993": {
                  "isPlayer": true,
                  "lastInitName": "Santander, A",
                  "lastName": "Santander",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-08-18",
                  "link": "/api/v1/people/623993",
                  "nameFirstLast": "Anthony Santander",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Anthony Santander",
                  "lastFirstName": "Santander, Anthony",
                  "birthCountry": "Venezuela",
                  "useName": "Anthony",
                  "id": 623993,
                  "fullFMLName": "Anthony Roger Santander",
                  "height": "6' 2\"",
                  "nameSlug": "anthony-santander-623993",
                  "pronunciation": "SAHN-tahn-dare",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Agua Blanca",
                  "boxscoreName": "Santander",
                  "fullName": "Anthony Santander",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Margarita",
                  "initLastName": "A Santander",
                  "strikeZoneTop": 3.39,
                  "birthDate": "1994-10-19",
                  "primaryNumber": "25",
                  "firstName": "Anthony",
                  "fullLFMName": "Santander, Anthony Roger",
                  "useLastName": "Santander",
                  "middleName": "Roger",
                  "strikeZoneBottom": 1.62,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID595956": {
                  "isPlayer": true,
                  "lastInitName": "Gallagher, C",
                  "lastName": "Gallagher",
                  "birthStateProvince": "PA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-08-06",
                  "link": "/api/v1/people/595956",
                  "nameFirstLast": "Cam Gallagher",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 30,
                  "firstLastName": "Cam Gallagher",
                  "lastFirstName": "Gallagher, Cam",
                  "birthCountry": "USA",
                  "useName": "Cam",
                  "id": 595956,
                  "fullFMLName": "Cameron Joseph Gallagher",
                  "height": "6' 3\"",
                  "nameSlug": "cam-gallagher-595956",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Gally",
                  "draftYear": 2011,
                  "boxscoreName": "Gallagher",
                  "fullName": "Cam Gallagher",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Lancaster",
                  "initLastName": "C Gallagher",
                  "strikeZoneTop": 3.34,
                  "birthDate": "1992-12-06",
                  "primaryNumber": "35",
                  "firstName": "Cameron",
                  "fullLFMName": "Gallagher, Cameron Joseph",
                  "useLastName": "Gallagher",
                  "middleName": "Joseph",
                  "strikeZoneBottom": 1.57,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID660853": {
                  "isPlayer": true,
                  "lastInitName": "De Los Santos, E",
                  "lastName": "De Los Santos",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2018-07-10",
                  "link": "/api/v1/people/660853",
                  "nameFirstLast": "Enyel De Los Santos",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Enyel De Los Santos",
                  "lastFirstName": "De Los Santos, Enyel",
                  "birthCountry": "Dominican Republic",
                  "useName": "Enyel",
                  "id": 660853,
                  "fullFMLName": "Enyel De Los Santos",
                  "height": "6' 3\"",
                  "nameMatrilineal": "Polanco",
                  "nameSlug": "enyel-de-los-santos-660853",
                  "pronunciation": "AYN-yell day lohs SAN-tohs",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "De Los Santos, E",
                  "fullName": "Enyel De Los Santos",
                  "weight": 235,
                  "active": true,
                  "birthCity": "San Pedro de Macoris",
                  "initLastName": "E De Los Santos",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1995-12-25",
                  "primaryNumber": "62",
                  "firstName": "Enyel",
                  "fullLFMName": "De Los Santos, Enyel",
                  "useLastName": "De Los Santos",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID668939": {
                  "isPlayer": true,
                  "lastInitName": "Rutschman, A",
                  "lastName": "Rutschman",
                  "birthStateProvince": "OR",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-05-21",
                  "link": "/api/v1/people/668939",
                  "nameFirstLast": "Adley Rutschman",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 25,
                  "firstLastName": "Adley Rutschman",
                  "lastFirstName": "Rutschman, Adley",
                  "birthCountry": "USA",
                  "useName": "Adley",
                  "id": 668939,
                  "fullFMLName": "Adley Stan Rutschman",
                  "height": "6' 2\"",
                  "nameSlug": "adley-rutschman-668939",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Rutschman",
                  "fullName": "Adley Rutschman",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Portland",
                  "initLastName": "A Rutschman",
                  "strikeZoneTop": 3.4,
                  "birthDate": "1998-02-06",
                  "primaryNumber": "35",
                  "firstName": "Adley",
                  "fullLFMName": "Rutschman, Adley Stan",
                  "useLastName": "Rutschman",
                  "middleName": "Stan",
                  "strikeZoneBottom": 1.67,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID657097": {
                  "isPlayer": true,
                  "lastInitName": "Webb, J",
                  "lastName": "Webb",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-04-16",
                  "link": "/api/v1/people/657097",
                  "nameFirstLast": "Jacob Webb",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "Jacob Webb",
                  "lastFirstName": "Webb, Jacob",
                  "birthCountry": "USA",
                  "useName": "Jacob",
                  "id": 657097,
                  "fullFMLName": "Jacob Lawrence Webb",
                  "height": "6' 2\"",
                  "nameSlug": "jacob-webb-657097",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2014,
                  "boxscoreName": "Webb",
                  "fullName": "Jacob Webb",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Riverside",
                  "initLastName": "J Webb",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1993-08-15",
                  "primaryNumber": "66",
                  "firstName": "Jacob",
                  "fullLFMName": "Webb, Jacob Lawrence",
                  "useLastName": "Webb",
                  "middleName": "Lawrence",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID615698": {
                  "isPlayer": true,
                  "lastInitName": "Quantrill, C",
                  "lastName": "Quantrill",
                  "birthStateProvince": "ON",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2019-05-01",
                  "link": "/api/v1/people/615698",
                  "nameFirstLast": "Cal Quantrill",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "Cal Quantrill",
                  "lastFirstName": "Quantrill, Cal",
                  "birthCountry": "Canada",
                  "useName": "Cal",
                  "id": 615698,
                  "fullFMLName": "Cal Paul Quantrill",
                  "height": "6' 3\"",
                  "nameSlug": "cal-quantrill-615698",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Quan",
                  "draftYear": 2016,
                  "boxscoreName": "Quantrill",
                  "fullName": "Cal Quantrill",
                  "weight": 195,
                  "active": true,
                  "birthCity": "Port Hope",
                  "initLastName": "C Quantrill",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1995-02-10",
                  "primaryNumber": "47",
                  "firstName": "Cal",
                  "fullLFMName": "Quantrill, Cal Paul",
                  "useLastName": "Quantrill",
                  "middleName": "Paul",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID676059": {
                  "isPlayer": true,
                  "lastInitName": "Westburg, J",
                  "lastName": "Westburg",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2023-06-26",
                  "link": "/api/v1/people/676059",
                  "nameFirstLast": "Jordan Westburg",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 24,
                  "firstLastName": "Jordan Westburg",
                  "lastFirstName": "Westburg, Jordan",
                  "birthCountry": "USA",
                  "useName": "Jordan",
                  "id": 676059,
                  "fullFMLName": "Jordan Cole Westburg",
                  "height": "6' 2\"",
                  "nameSlug": "jordan-westburg-676059",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2020,
                  "boxscoreName": "Westburg",
                  "fullName": "Jordan Westburg",
                  "weight": 210,
                  "active": true,
                  "birthCity": "New Braunfels",
                  "initLastName": "J Westburg",
                  "strikeZoneTop": 3.42,
                  "birthDate": "1999-02-18",
                  "primaryNumber": "11",
                  "firstName": "Jordan",
                  "fullLFMName": "Westburg, Jordan Cole",
                  "useLastName": "Westburg",
                  "middleName": "Cole",
                  "strikeZoneBottom": 1.64,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID657656": {
                  "isPlayer": true,
                  "lastInitName": "Laureano, R",
                  "lastName": "Laureano",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-08-03",
                  "link": "/api/v1/people/657656",
                  "nameFirstLast": "Ramon Laureano",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 29,
                  "firstLastName": "Ramón Laureano",
                  "lastFirstName": "Laureano, Ramón",
                  "birthCountry": "Dominican Republic",
                  "useName": "Ramon",
                  "id": 657656,
                  "fullFMLName": "Ramón Laureano",
                  "height": "5' 11\"",
                  "nameSlug": "ramon-laureano-657656",
                  "pronunciation": "lah-reh-AH-no",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Ramoncito",
                  "draftYear": 2014,
                  "boxscoreName": "Laureano",
                  "fullName": "Ramon Laureano",
                  "weight": 203,
                  "active": true,
                  "birthCity": "Santo Domingo",
                  "initLastName": "R Laureano",
                  "strikeZoneTop": 3.13,
                  "birthDate": "1994-07-15",
                  "primaryNumber": "10",
                  "firstName": "Ramon",
                  "fullLFMName": "Laureano, Ramón",
                  "useLastName": "Laureano",
                  "strikeZoneBottom": 1.43,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID672335": {
                  "isPlayer": true,
                  "lastInitName": "Pérez, C",
                  "lastName": "Perez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-07-11",
                  "link": "/api/v1/people/672335",
                  "nameFirstLast": "Cionel Perez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Cionel Pérez",
                  "lastFirstName": "Pérez, Cionel",
                  "birthCountry": "Cuba",
                  "useName": "Cionel",
                  "id": 672335,
                  "fullFMLName": "Cionel Felix Pérez",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Viera",
                  "nameSlug": "cionel-perez-672335",
                  "pronunciation": "see-oh-NELL",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "boxscoreName": "Pérez, C",
                  "fullName": "Cionel Perez",
                  "weight": 175,
                  "active": true,
                  "birthCity": "La Habana",
                  "initLastName": "C Pérez",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1996-04-21",
                  "primaryNumber": "58",
                  "firstName": "Cionel",
                  "fullLFMName": "Pérez, Cionel Felix",
                  "useLastName": "Pérez",
                  "middleName": "Felix",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID677588": {
                  "isPlayer": true,
                  "lastInitName": "Tena, J",
                  "lastName": "Tena",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2023-08-05",
                  "link": "/api/v1/people/677588",
                  "nameFirstLast": "Jose Tena",
                  "primaryPosition": {
                    "code": "6",
                    "name": "Shortstop",
                    "type": "Infielder",
                    "abbreviation": "SS"
                  },
                  "currentAge": 22,
                  "firstLastName": "José Tena",
                  "lastFirstName": "Tena, José",
                  "birthCountry": "Dominican Republic",
                  "useName": "Jose",
                  "id": 677588,
                  "fullFMLName": "José Luis Tena",
                  "height": "5' 11\"",
                  "nameMatrilineal": "De Leon",
                  "nameSlug": "jose-tena-677588",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Tena",
                  "fullName": "Jose Tena",
                  "weight": 195,
                  "active": true,
                  "birthCity": "San Cristobal",
                  "initLastName": "J Tena",
                  "strikeZoneTop": 3.35,
                  "birthDate": "2001-03-20",
                  "primaryNumber": "8",
                  "firstName": "Jose",
                  "fullLFMName": "Tena, José Luis",
                  "useLastName": "Tena",
                  "middleName": "Luis",
                  "strikeZoneBottom": 1.6,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID671289": {
                  "isPlayer": true,
                  "lastInitName": "Freeman, T",
                  "lastName": "Freeman",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2022-08-03",
                  "link": "/api/v1/people/671289",
                  "nameFirstLast": "Tyler Freeman",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 24,
                  "firstLastName": "Tyler Freeman",
                  "lastFirstName": "Freeman, Tyler",
                  "birthCountry": "USA",
                  "useName": "Tyler",
                  "id": 671289,
                  "fullFMLName": "Tyler Andrew Freeman",
                  "height": "6' 0\"",
                  "nameSlug": "tyler-freeman-671289",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Freeman, T",
                  "fullName": "Tyler Freeman",
                  "weight": 190,
                  "active": true,
                  "birthCity": "Rancho Cucamonga",
                  "initLastName": "T Freeman",
                  "strikeZoneTop": 3.29,
                  "birthDate": "1999-05-21",
                  "primaryNumber": "2",
                  "firstName": "Tyler",
                  "fullLFMName": "Freeman, Tyler Andrew",
                  "useLastName": "Freeman",
                  "middleName": "Andrew",
                  "strikeZoneBottom": 1.47,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID669720": {
                  "isPlayer": true,
                  "lastInitName": "Hays, A",
                  "lastName": "Hays",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-09-07",
                  "link": "/api/v1/people/669720",
                  "nameFirstLast": "Austin Hays",
                  "primaryPosition": {
                    "code": "7",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "LF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Austin Hays",
                  "lastFirstName": "Hays, Austin",
                  "birthCountry": "USA",
                  "useName": "Austin",
                  "id": 669720,
                  "fullFMLName": "Austin Charles Bryan Hays",
                  "height": "5' 11\"",
                  "nameSlug": "austin-hays-669720",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2016,
                  "boxscoreName": "Hays",
                  "fullName": "Austin Hays",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Daytona Beach",
                  "initLastName": "A Hays",
                  "strikeZoneTop": 3.21,
                  "birthDate": "1995-07-05",
                  "primaryNumber": "21",
                  "firstName": "Austin",
                  "fullLFMName": "Hays, Austin Charles Bryan",
                  "useLastName": "Hays",
                  "middleName": "Charles Bryan",
                  "strikeZoneBottom": 1.46,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID671106": {
                  "isPlayer": true,
                  "lastInitName": "Allen, L",
                  "lastName": "Allen",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-04-23",
                  "link": "/api/v1/people/671106",
                  "nameFirstLast": "Logan Allen",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 25,
                  "firstLastName": "Logan Allen",
                  "lastFirstName": "Allen, Logan",
                  "birthCountry": "USA",
                  "useName": "Logan",
                  "id": 671106,
                  "fullFMLName": "Logan Taylor Allen",
                  "height": "6' 0\"",
                  "nameSlug": "logan-allen-671106",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2020,
                  "boxscoreName": "Allen, L.T.",
                  "fullName": "Logan Allen",
                  "weight": 190,
                  "active": true,
                  "birthCity": "Altamonte Springs",
                  "initLastName": "L Allen",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1998-09-05",
                  "primaryNumber": "41",
                  "firstName": "Logan",
                  "fullLFMName": "Allen, Logan Taylor",
                  "useLastName": "Allen",
                  "middleName": "Taylor",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID656529": {
                  "isPlayer": true,
                  "lastInitName": "Hentges, S",
                  "lastName": "Hentges",
                  "birthStateProvince": "MN",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2021-04-20",
                  "link": "/api/v1/people/656529",
                  "nameFirstLast": "Sam Hentges",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Sam Hentges",
                  "lastFirstName": "Hentges, Sam",
                  "birthCountry": "USA",
                  "useName": "Sam",
                  "id": 656529,
                  "fullFMLName": "Sam D. Hentges",
                  "height": "6' 6\"",
                  "nameSlug": "sam-hentges-656529",
                  "pronunciation": "HENT-ghez",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2014,
                  "boxscoreName": "Hentges",
                  "fullName": "Sam Hentges",
                  "weight": 245,
                  "active": true,
                  "birthCity": "Shoreview",
                  "initLastName": "S Hentges",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1996-07-18",
                  "primaryNumber": "31",
                  "firstName": "Sam",
                  "fullLFMName": "Hentges, Sam D.",
                  "useLastName": "Hentges",
                  "middleName": "D.",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID663986": {
                  "isPlayer": true,
                  "lastInitName": "Stephan, T",
                  "lastName": "Stephan",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2021-04-03",
                  "link": "/api/v1/people/663986",
                  "nameFirstLast": "Trevor Stephan",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Trevor Stephan",
                  "lastFirstName": "Stephan, Trevor",
                  "birthCountry": "USA",
                  "useName": "Trevor",
                  "id": 663986,
                  "fullFMLName": "Trevor R. Stephan",
                  "height": "6' 5\"",
                  "nameSlug": "trevor-stephan-663986",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Stephan",
                  "fullName": "Trevor Stephan",
                  "weight": 225,
                  "active": true,
                  "birthCity": "Magnolia",
                  "initLastName": "T Stephan",
                  "strikeZoneTop": 3.575,
                  "birthDate": "1995-11-25",
                  "primaryNumber": "37",
                  "firstName": "Trevor",
                  "fullLFMName": "Stephan, Trevor R.",
                  "useLastName": "Stephan",
                  "middleName": "R.",
                  "strikeZoneBottom": 1.681,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID666974": {
                  "isPlayer": true,
                  "lastInitName": "Cano, Y",
                  "lastName": "Cano",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-05-11",
                  "link": "/api/v1/people/666974",
                  "nameFirstLast": "Yennier Cano",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Yennier Cano",
                  "lastFirstName": "Cano, Yennier",
                  "birthCountry": "Cuba",
                  "useName": "Yennier",
                  "id": 666974,
                  "fullFMLName": "Yennier  Cano",
                  "height": "6' 4\"",
                  "nameMatrilineal": "Banes",
                  "nameSlug": "yennier-cano-666974",
                  "pronunciation": "yen-NEER",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Cano",
                  "fullName": "Yennier Cano",
                  "weight": 245,
                  "active": true,
                  "birthCity": "Havana",
                  "initLastName": "Y Cano",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1994-03-09",
                  "primaryNumber": "78",
                  "firstName": "Yennier",
                  "fullLFMName": "Cano, Yennier",
                  "useLastName": "Cano",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID668909": {
                  "isPlayer": true,
                  "lastInitName": "Williams, G",
                  "lastName": "Williams",
                  "birthStateProvince": "NC",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2023-06-21",
                  "link": "/api/v1/people/668909",
                  "nameFirstLast": "Gavin Williams",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 24,
                  "firstLastName": "Gavin Williams",
                  "lastFirstName": "Williams, Gavin",
                  "birthCountry": "USA",
                  "useName": "Gavin",
                  "id": 668909,
                  "fullFMLName": "Gavin Scott Williams",
                  "height": "6' 6\"",
                  "nameSlug": "gavin-williams-668909",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2021,
                  "boxscoreName": "Williams, G",
                  "fullName": "Gavin Williams",
                  "weight": 250,
                  "active": true,
                  "birthCity": "Fayetteville",
                  "initLastName": "G Williams",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1999-07-26",
                  "primaryNumber": "63",
                  "firstName": "Gavin",
                  "fullLFMName": "Williams, Gavin Scott",
                  "useLastName": "Williams",
                  "middleName": "Scott",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID683769": {
                  "isPlayer": true,
                  "lastInitName": "Gaddis, H",
                  "lastName": "Gaddis",
                  "birthStateProvince": "GA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-08-05",
                  "link": "/api/v1/people/683769",
                  "nameFirstLast": "Hunter Gaddis",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 25,
                  "firstLastName": "Hunter Gaddis",
                  "lastFirstName": "Gaddis, Hunter",
                  "birthCountry": "USA",
                  "useName": "Hunter",
                  "id": 683769,
                  "fullFMLName": "Hunter Reid Gaddis",
                  "height": "6' 6\"",
                  "nameSlug": "hunter-gaddis-683769",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Gaddis",
                  "fullName": "Hunter Gaddis",
                  "weight": 260,
                  "active": true,
                  "birthCity": "Canton",
                  "initLastName": "H Gaddis",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1998-04-09",
                  "primaryNumber": "33",
                  "firstName": "Hunter",
                  "fullLFMName": "Gaddis, Hunter Reid",
                  "useLastName": "Gaddis",
                  "middleName": "Reid",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID664702": {
                  "isPlayer": true,
                  "lastInitName": "Straw, M",
                  "lastName": "Straw",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-09-15",
                  "link": "/api/v1/people/664702",
                  "nameFirstLast": "Myles Straw",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Myles Straw",
                  "lastFirstName": "Straw, Myles",
                  "birthCountry": "USA",
                  "useName": "Myles",
                  "id": 664702,
                  "fullFMLName": "Myles James Noble Straw",
                  "height": "5' 10\"",
                  "nameSlug": "myles-straw-664702",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2015,
                  "boxscoreName": "Straw",
                  "fullName": "Myles Straw",
                  "weight": 178,
                  "active": true,
                  "birthCity": "Garden Grove",
                  "initLastName": "M Straw",
                  "strikeZoneTop": 3.4,
                  "birthDate": "1994-10-17",
                  "primaryNumber": "7",
                  "firstName": "Myles",
                  "fullLFMName": "Straw, Myles James Noble",
                  "useLastName": "Straw",
                  "middleName": "James Noble",
                  "strikeZoneBottom": 1.57,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID607644": {
                  "isPlayer": true,
                  "lastInitName": "Means, J",
                  "lastName": "Means",
                  "birthStateProvince": "KS",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2018-09-26",
                  "link": "/api/v1/people/607644",
                  "nameFirstLast": "John Means",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "John Means",
                  "lastFirstName": "Means, John",
                  "birthCountry": "USA",
                  "useName": "John",
                  "id": 607644,
                  "fullFMLName": "John Alan Means",
                  "height": "6' 4\"",
                  "nameSlug": "john-means-607644",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Meansy",
                  "draftYear": 2014,
                  "boxscoreName": "Means",
                  "fullName": "John Means",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Olathe",
                  "initLastName": "J Means",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1993-04-24",
                  "primaryNumber": "47",
                  "firstName": "John",
                  "fullLFMName": "Means, John Alan",
                  "useLastName": "Means",
                  "middleName": "Alan",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID608337": {
                  "isPlayer": true,
                  "lastInitName": "Giolito, L",
                  "lastName": "Giolito",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2016-06-28",
                  "link": "/api/v1/people/608337",
                  "nameFirstLast": "Lucas Giolito",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Lucas Giolito",
                  "lastFirstName": "Giolito, Lucas",
                  "birthCountry": "USA",
                  "useName": "Lucas",
                  "id": 608337,
                  "fullFMLName": "Lucas F. Giolito",
                  "height": "6' 6\"",
                  "nameSlug": "lucas-giolito-608337",
                  "pronunciation": "gee-oh-LEE-toe",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Big Foot",
                  "draftYear": 2012,
                  "boxscoreName": "Giolito",
                  "fullName": "Lucas Giolito",
                  "weight": 245,
                  "active": true,
                  "birthCity": "Santa Monica",
                  "initLastName": "L Giolito",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1994-07-14",
                  "primaryNumber": "27",
                  "firstName": "Lucas",
                  "fullLFMName": "Giolito, Lucas F.",
                  "useLastName": "Giolito",
                  "middleName": "F.",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID605347": {
                  "isPlayer": true,
                  "lastInitName": "López, J",
                  "lastName": "Lopez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2015-09-29",
                  "link": "/api/v1/people/605347",
                  "nameFirstLast": "Jorge Lopez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "Jorge López",
                  "lastFirstName": "López, Jorge",
                  "birthCountry": "Puerto Rico",
                  "useName": "Jorge",
                  "id": 605347,
                  "fullFMLName": "Jorge Yabiel López",
                  "height": "6' 3\"",
                  "nameMatrilineal": "Ramos",
                  "nameSlug": "jorge-lopez-605347",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "El Pichu",
                  "draftYear": 2011,
                  "boxscoreName": "López, Jo",
                  "fullName": "Jorge Lopez",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Caguas",
                  "initLastName": "J López",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1993-02-10",
                  "primaryNumber": "73",
                  "firstName": "Jorge",
                  "fullLFMName": "López, Jorge Yabiel",
                  "useLastName": "López",
                  "middleName": "Yabiel",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID669084": {
                  "isPlayer": true,
                  "lastInitName": "Hall, D",
                  "lastName": "Hall",
                  "birthStateProvince": "GA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-08-13",
                  "link": "/api/v1/people/669084",
                  "nameFirstLast": "DL Hall",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 25,
                  "firstLastName": "DL Hall",
                  "lastFirstName": "Hall, DL",
                  "birthCountry": "USA",
                  "useName": "DL",
                  "id": 669084,
                  "fullFMLName": "Dayton Lane Hall",
                  "height": "6' 2\"",
                  "nameSlug": "dl-hall-669084",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Hall, DL",
                  "fullName": "DL Hall",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Valdosta",
                  "initLastName": "D Hall",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1998-09-19",
                  "primaryNumber": "24",
                  "firstName": "Dayton",
                  "fullLFMName": "Hall, Dayton Lane",
                  "useLastName": "Hall",
                  "middleName": "Lane",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID543056": {
                  "isPlayer": true,
                  "lastInitName": "Coulombe, D",
                  "lastName": "Coulombe",
                  "birthStateProvince": "MO",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-09-16",
                  "link": "/api/v1/people/543056",
                  "nameFirstLast": "Danny Coulombe",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 33,
                  "firstLastName": "Danny Coulombe",
                  "lastFirstName": "Coulombe, Danny",
                  "birthCountry": "USA",
                  "useName": "Danny",
                  "id": 543056,
                  "fullFMLName": "Daniel Paul Coulombe",
                  "height": "5' 10\"",
                  "nameSlug": "danny-coulombe-543056",
                  "pronunciation": "KOO-lohm",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Frenchie",
                  "draftYear": 2012,
                  "boxscoreName": "Coulombe",
                  "fullName": "Danny Coulombe",
                  "weight": 190,
                  "active": true,
                  "birthCity": "St. Louis",
                  "initLastName": "D Coulombe",
                  "strikeZoneTop": 3.301,
                  "birthDate": "1989-10-26",
                  "primaryNumber": "54",
                  "firstName": "Daniel",
                  "fullLFMName": "Coulombe, Daniel Paul",
                  "useLastName": "Coulombe",
                  "middleName": "Paul",
                  "strikeZoneBottom": 1.504,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID656811": {
                  "isPlayer": true,
                  "lastInitName": "O'Hearn, R",
                  "lastName": "O'Hearn",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-07-31",
                  "link": "/api/v1/people/656811",
                  "nameFirstLast": "Ryan O'Hearn",
                  "primaryPosition": {
                    "code": "3",
                    "name": "First Base",
                    "type": "Infielder",
                    "abbreviation": "1B"
                  },
                  "currentAge": 30,
                  "firstLastName": "Ryan O'Hearn",
                  "lastFirstName": "O'Hearn, Ryan",
                  "birthCountry": "USA",
                  "useName": "Ryan",
                  "id": 656811,
                  "fullFMLName": "Ryan Patrick O'Hearn",
                  "height": "6' 3\"",
                  "nameSlug": "ryan-o-hearn-656811",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Brohearn",
                  "draftYear": 2014,
                  "boxscoreName": "O'Hearn",
                  "fullName": "Ryan O'Hearn",
                  "weight": 220,
                  "active": true,
                  "birthCity": "Dunedin",
                  "initLastName": "R O'Hearn",
                  "strikeZoneTop": 3.48,
                  "birthDate": "1993-07-26",
                  "primaryNumber": "32",
                  "firstName": "Ryan",
                  "fullLFMName": "O'Hearn, Ryan Patrick",
                  "useLastName": "O'Hearn",
                  "middleName": "Patrick",
                  "strikeZoneBottom": 1.69,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID656775": {
                  "isPlayer": true,
                  "lastInitName": "Mullins, C",
                  "lastName": "Mullins",
                  "birthStateProvince": "NC",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-08-10",
                  "link": "/api/v1/people/656775",
                  "nameFirstLast": "Cedric Mullins",
                  "nameSuffix": "II",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Cedric Mullins",
                  "lastFirstName": "Mullins, Cedric",
                  "birthCountry": "USA",
                  "useName": "Cedric",
                  "id": 656775,
                  "fullFMLName": "Boyce Cedric Mullins",
                  "height": "5' 9\"",
                  "nameSlug": "cedric-mullins-656775",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2015,
                  "nameTitle": "II",
                  "boxscoreName": "Mullins",
                  "fullName": "Cedric Mullins",
                  "weight": 175,
                  "active": true,
                  "birthCity": "Greensboro",
                  "initLastName": "C Mullins",
                  "strikeZoneTop": 3.34,
                  "birthDate": "1994-10-01",
                  "primaryNumber": "31",
                  "firstName": "Boyce",
                  "fullLFMName": "Mullins, Boyce Cedric",
                  "useLastName": "Mullins",
                  "middleName": "Cedric",
                  "strikeZoneBottom": 1.55,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                }
              },
              "probablePitchers": {
                "away": {
                  "link": "/api/v1/people/680570",
                  "fullName": "Grayson Rodriguez",
                  "id": 680570
                },
                "home": {
                  "link": "/api/v1/people/683769",
                  "fullName": "Hunter Gaddis",
                  "id": 683769
                }
              },
              "primaryDatacaster": {
                "link": "/api/v1/people/693488",
                "fullName": "Pat Madine",
                "id": 693488
              },
              "gameInfo": {
                "firstPitch": "2023-09-21T23:15:00.000Z",
                "attendance": 25226
              },
              "flags": {
                "homeTeamNoHitter": false,
                "awayTeamPerfectGame": false,
                "awayTeamNoHitter": false,
                "perfectGame": false,
                "homeTeamPerfectGame": false,
                "noHitter": false
              },
              "alerts": [],
              "datetime": {
                "dateTime": "2023-09-21T23:15:00Z",
                "dayNight": "night",
                "ampm": "PM",
                "originalDate": "2023-09-21",
                "time": "7:15",
                "officialDate": "2023-09-21"
              },
              "review": {
                "away": {
                  "used": 0,
                  "remaining": 1
                },
                "hasChallenges": true,
                "home": {
                  "used": 0,
                  "remaining": 1
                }
              },
              "weather": {
                "condition": "Clear",
                "temp": "73",
                "wind": "15 mph, In From RF"
              },
              "moundVisits": {
                "away": {
                  "used": 2,
                  "remaining": 3
                },
                "home": {
                  "used": 2,
                  "remaining": 3
                }
              },
              "status": {
                "codedGameState": "I",
                "abstractGameCode": "L",
                "abstractGameState": "Live",
                "detailedState": "In Progress",
                "startTimeTBD": false,
                "statusCode": "I"
              },
              "officialVenue": {
                "link": "/api/v1/venues/5",
                "id": 5
              }
            },
            "latestPlays": [
              {
                "result": {
                  "homeScore": 5,
                  "awayScore": 2,
                  "rbi": 0,
                  "isOut": false,
                  "type": "atBat"
                },
                "actionIndex": [
                  0,
                  1,
                  2,
                  3
                ],
                "runnerIndex": [],
                "pitchIndex": [
                  4,
                  5,
                  6,
                  8
                ],
                "playEndTime": "2023-09-22T02:15:37.414Z",
                "about": {
                  "hasOut": false,
                  "captivatingIndex": 0,
                  "inning": 9,
                  "isScoringPlay": false,
                  "atBatIndex": 70,
                  "startTime": "2023-09-22T02:14:36.863Z",
                  "isTopInning": true,
                  "endTime": "2023-09-22T02:15:37.414Z",
                  "halfInning": "top",
                  "isComplete": false
                },
                "count": {
                  "outs": 0,
                  "balls": 2,
                  "strikes": 2
                },
                "atBatIndex": 70,
                "runners": [],
                "playEvents": [
                  {
                    "isPitch": false,
                    "battingOrder": "401",
                    "count": {
                      "outs": 0,
                      "balls": 0,
                      "strikes": 0
                    },
                    "index": 0,
                    "details": {
                      "homeScore": 5,
                      "awayScore": 2,
                      "isScoringPlay": false,
                      "description": "Tyler Freeman remains in the game as the designated hitter.",
                      "isOut": false,
                      "eventType": "defensive_switch",
                      "event": "Defensive Switch",
                      "hasReview": false
                    },
                    "startTime": "2023-09-22T02:13:26.383Z",
                    "endTime": "2023-09-22T02:13:26.437Z",
                    "isSubstitution": true,
                    "position": {
                      "code": "10",
                      "name": "Designated Hitter",
                      "type": "Hitter",
                      "abbreviation": "DH"
                    },
                    "type": "action",
                    "replacedPlayer": {
                      "link": "/api/v1/people/594777",
                      "id": 594777
                    },
                    "player": {
                      "link": "/api/v1/people/671289",
                      "id": 671289
                    }
                  },
                  {
                    "isPitch": false,
                    "battingOrder": "600",
                    "count": {
                      "outs": 0,
                      "balls": 0,
                      "strikes": 0
                    },
                    "index": 1,
                    "details": {
                      "homeScore": 5,
                      "awayScore": 2,
                      "isScoringPlay": false,
                      "description": "Defensive switch from center field to right field for Ramon Laureano.",
                      "isOut": false,
                      "eventType": "defensive_switch",
                      "event": "Defensive Switch",
                      "hasReview": false
                    },
                    "startTime": "2023-09-22T02:13:26.437Z",
                    "endTime": "2023-09-22T02:13:26.439Z",
                    "isSubstitution": true,
                    "position": {
                      "code": "9",
                      "name": "Outfielder",
                      "type": "Outfielder",
                      "abbreviation": "RF"
                    },
                    "type": "action",
                    "player": {
                      "link": "/api/v1/people/657656",
                      "id": 657656
                    }
                  },
                  {
                    "isPitch": false,
                    "battingOrder": "701",
                    "count": {
                      "outs": 0,
                      "balls": 0,
                      "strikes": 0
                    },
                    "index": 2,
                    "details": {
                      "homeScore": 5,
                      "awayScore": 2,
                      "isScoringPlay": false,
                      "description": "Myles Straw remains in the game as the center fielder.",
                      "isOut": false,
                      "eventType": "defensive_switch",
                      "event": "Defensive Switch",
                      "hasReview": false
                    },
                    "startTime": "2023-09-22T02:13:26.439Z",
                    "endTime": "2023-09-22T02:13:26.443Z",
                    "isSubstitution": true,
                    "position": {
                      "code": "8",
                      "name": "Outfielder",
                      "type": "Outfielder",
                      "abbreviation": "CF"
                    },
                    "type": "action",
                    "replacedPlayer": {
                      "link": "/api/v1/people/686823",
                      "id": 686823
                    },
                    "player": {
                      "link": "/api/v1/people/664702",
                      "id": 664702
                    }
                  },
                  {
                    "isPitch": false,
                    "count": {
                      "outs": 0,
                      "balls": 0,
                      "strikes": 0
                    },
                    "index": 3,
                    "details": {
                      "homeScore": 5,
                      "awayScore": 2,
                      "isScoringPlay": false,
                      "description": "Pitching Change: Emmanuel Clase replaces Trevor Stephan.",
                      "isOut": false,
                      "eventType": "pitching_substitution",
                      "event": "Pitching Substitution",
                      "hasReview": false
                    },
                    "startTime": "2023-09-22T02:13:26.443Z",
                    "endTime": "2023-09-22T02:14:39.863Z",
                    "isSubstitution": true,
                    "position": {
                      "code": "1",
                      "name": "Pitcher",
                      "type": "Pitcher",
                      "abbreviation": "P"
                    },
                    "type": "action",
                    "player": {
                      "link": "/api/v1/people/661403",
                      "id": 661403
                    }
                  },
                  {
                    "playId": "e2bedf14-e671-45d6-b961-5318653e0ace",
                    "pitchData": {
                      "endSpeed": 90.5,
                      "extension": 6.552357016621962,
                      "breaks": {
                        "spinRate": 2649,
                        "breakHorizontal": -3.7,
                        "breakAngle": 6,
                        "breakVertical": -17,
                        "breakVerticalInduced": 11,
                        "spinDirection": 169
                      },
                      "startSpeed": 98.6,
                      "zone": 11,
                      "plateTime": 0.380661763495429,
                      "coordinates": {
                        "pfxX": 2.1381474394589386,
                        "pX": -0.2517929034157176,
                        "pZ": 3.6085952015228844,
                        "pfxZ": 6.317357813318418,
                        "vY0": -143.67509650560584,
                        "vZ0": -3.332682755608729,
                        "vX0": -0.5366102857210243,
                        "z0": 5.953540398804762,
                        "y0": 50.00387152910718,
                        "aX": 4.487546052729909,
                        "aY": 32.07825603767276,
                        "x": 126.6,
                        "x0": -0.3408882393145306,
                        "aZ": -18.916302355462882,
                        "y": 141.35
                      },
                      "strikeZoneTop": 3.21,
                      "strikeZoneBottom": 1.46
                    },
                    "isPitch": true,
                    "pitchNumber": 1,
                    "count": {
                      "outs": 0,
                      "balls": 1,
                      "strikes": 0
                    },
                    "index": 4,
                    "details": {
                      "call": {
                        "code": "B",
                        "description": "Ball"
                      },
                      "ballColor": "rgba(39, 161, 39, 1.0)",
                      "code": "B",
                      "description": "Ball",
                      "isBall": true,
                      "isOut": false,
                      "type": {
                        "code": "FC",
                        "description": "Cutter"
                      },
                      "trailColor": "rgba(152, 0, 101, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": false
                    },
                    "startTime": "2023-09-22T02:14:39.863Z",
                    "endTime": "2023-09-22T02:14:54.172Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "1db8eaf9-f985-43d3-8660-ff6fef2ae78d",
                    "pitchData": {
                      "endSpeed": 90.2,
                      "extension": 6.615318103145827,
                      "breaks": {
                        "spinRate": 2641,
                        "breakHorizontal": -2,
                        "breakAngle": 12,
                        "breakVertical": -19.3,
                        "breakVerticalInduced": 9,
                        "spinDirection": 172
                      },
                      "startSpeed": 97.9,
                      "zone": 2,
                      "plateTime": 0.38316344542978964,
                      "coordinates": {
                        "pfxX": 0.9962146196807955,
                        "pX": 0.22306368345127048,
                        "pZ": 2.7531580574864716,
                        "pfxZ": 5.391413671305282,
                        "vY0": -142.561048524892,
                        "vZ0": -5.037461398663866,
                        "vX0": 1.5020812206458303,
                        "z0": 5.855111869942289,
                        "y0": 50.00061691392374,
                        "aX": 2.064478008201807,
                        "aY": 30.590205437910164,
                        "x": 108.5,
                        "x0": -0.43861428743111663,
                        "aZ": -20.993950457518075,
                        "y": 164.44
                      },
                      "strikeZoneTop": 3.21,
                      "strikeZoneBottom": 1.46
                    },
                    "isPitch": true,
                    "pitchNumber": 2,
                    "count": {
                      "outs": 0,
                      "balls": 1,
                      "strikes": 1
                    },
                    "index": 5,
                    "details": {
                      "call": {
                        "code": "C",
                        "description": "Called Strike"
                      },
                      "ballColor": "rgba(170, 21, 11, 1.0)",
                      "code": "C",
                      "description": "Called Strike",
                      "isBall": false,
                      "isOut": false,
                      "type": {
                        "code": "FC",
                        "description": "Cutter"
                      },
                      "trailColor": "rgba(152, 0, 101, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": true
                    },
                    "startTime": "2023-09-22T02:14:54.172Z",
                    "endTime": "2023-09-22T02:15:08.821Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "6bba92d3-b888-4386-bac7-80a03e26ac55",
                    "pitchData": {
                      "endSpeed": 81.6,
                      "extension": 6.689533028667978,
                      "breaks": {
                        "spinRate": 2689,
                        "breakHorizontal": -10.4,
                        "breakAngle": 25.2,
                        "breakVertical": -30.4,
                        "breakVerticalInduced": 4.4,
                        "spinDirection": 66
                      },
                      "startSpeed": 88.6,
                      "zone": 14,
                      "plateTime": 0.4248429959180915,
                      "coordinates": {
                        "pfxX": 5.717813344757148,
                        "pX": 0.4146621717005251,
                        "pZ": 1.139344194255813,
                        "pfxZ": 3.1550435429766672,
                        "vY0": -128.90750849810755,
                        "vZ0": -6.575513544214475,
                        "vX0": 0.5382886384102848,
                        "z0": 5.79557271696149,
                        "y0": 50.00052456346015,
                        "aX": 9.623640970354469,
                        "aY": 26.71384005279181,
                        "x": 101.19,
                        "x0": -0.5395884958888795,
                        "aZ": -26.855822274058873,
                        "y": 208.02
                      },
                      "strikeZoneTop": 3.21,
                      "strikeZoneBottom": 1.46
                    },
                    "isPitch": true,
                    "pitchNumber": 3,
                    "count": {
                      "outs": 0,
                      "balls": 1,
                      "strikes": 2
                    },
                    "index": 6,
                    "details": {
                      "call": {
                        "code": "S",
                        "description": "Swinging Strike"
                      },
                      "ballColor": "rgba(170, 21, 11, 1.0)",
                      "code": "S",
                      "description": "Swinging Strike",
                      "isBall": false,
                      "isOut": false,
                      "type": {
                        "code": "SL",
                        "description": "Slider"
                      },
                      "trailColor": "rgba(0, 0, 254, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": true
                    },
                    "startTime": "2023-09-22T02:15:08.821Z",
                    "endTime": "2023-09-22T02:15:20.932Z",
                    "type": "pitch"
                  },
                  {
                    "isPitch": false,
                    "count": {
                      "outs": 0,
                      "balls": 1,
                      "strikes": 2
                    },
                    "index": 7,
                    "details": {
                      "homeScore": 5,
                      "awayScore": 2,
                      "isScoringPlay": false,
                      "description": "Batter Timeout.",
                      "isOut": false,
                      "eventType": "batter_timeout",
                      "event": "Batter Timeout",
                      "hasReview": false
                    },
                    "startTime": "2023-09-22T02:15:20.932Z",
                    "endTime": "2023-09-22T02:15:37.414Z",
                    "type": "action",
                    "player": {
                      "link": "/api/v1/people/669720",
                      "id": 669720
                    }
                  },
                  {
                    "playId": "e6338681-5e6b-4cbe-9ecb-f51d0882270e",
                    "pitchData": {
                      "endSpeed": 84.2,
                      "breaks": {
                        "spinRate": 2693,
                        "breakHorizontal": -8.3,
                        "breakAngle": 32.4,
                        "breakVertical": -33.8,
                        "breakVerticalInduced": -1,
                        "spinDirection": 62
                      },
                      "startSpeed": 91.1,
                      "zone": 14,
                      "plateTime": 0.4130835919959721,
                      "coordinates": {
                        "pfxX": 4.252726283881759,
                        "pX": 1.3810579496544821,
                        "pZ": 0.74932360891144,
                        "pfxZ": 0.21600142883893403,
                        "vY0": -132.56451528400657,
                        "vZ0": -7.112632520612162,
                        "vX0": 2.888660059912065,
                        "z0": 5.786137074838649,
                        "y0": 50.00323819432226,
                        "aX": 7.572778958447824,
                        "aY": 28.191120513650393,
                        "x": 64.36,
                        "x0": -0.2750588373195438,
                        "aZ": -31.789666266414592,
                        "y": 218.55
                      },
                      "strikeZoneTop": 3.21,
                      "strikeZoneBottom": 1.46
                    },
                    "isPitch": true,
                    "pitchNumber": 4,
                    "count": {
                      "outs": 0,
                      "balls": 2,
                      "strikes": 2
                    },
                    "index": 8,
                    "details": {
                      "call": {
                        "code": "B",
                        "description": "Ball"
                      },
                      "ballColor": "rgba(39, 161, 39, 1.0)",
                      "code": "B",
                      "description": "Ball",
                      "isBall": true,
                      "isOut": false,
                      "type": {
                        "code": "SL",
                        "description": "Slider"
                      },
                      "trailColor": "rgba(0, 0, 254, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": false
                    },
                    "startTime": "2023-09-22T02:15:37.414Z",
                    "endTime": "2023-09-22T02:15:37.414Z",
                    "type": "pitch"
                  }
                ],
                "matchup": {
                  "splits": {
                    "batter": "vs_RHP",
                    "menOnBase": "Empty",
                    "pitcher": "vs_RHB"
                  },
                  "batter": {
                    "link": "/api/v1/people/669720",
                    "fullName": "Austin Hays",
                    "id": 669720
                  },
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "batterHotColdZones": [
                    {
                      "temp": "lukewarm",
                      "color": "rgba(255, 255, 255, 0.55)",
                      "zone": "01",
                      "value": ".935"
                    },
                    {
                      "temp": "lukewarm",
                      "color": "rgba(255, 255, 255, 0.55)",
                      "zone": "02",
                      "value": ".769"
                    },
                    {
                      "temp": "lukewarm",
                      "color": "rgba(255, 255, 255, 0.55)",
                      "zone": "03",
                      "value": ".722"
                    },
                    {
                      "temp": "hot",
                      "color": "rgba(214, 41, 52, .55)",
                      "zone": "04",
                      "value": "1.196"
                    },
                    {
                      "temp": "warm",
                      "color": "rgba(234, 147, 153, .55)",
                      "zone": "05",
                      "value": ".952"
                    },
                    {
                      "temp": "cold",
                      "color": "rgba(6, 90, 238, .55)",
                      "zone": "06",
                      "value": ".407"
                    },
                    {
                      "temp": "lukewarm",
                      "color": "rgba(255, 255, 255, 0.55)",
                      "zone": "07",
                      "value": ".714"
                    },
                    {
                      "temp": "warm",
                      "color": "rgba(234, 147, 153, .55)",
                      "zone": "08",
                      "value": "1.023"
                    },
                    {
                      "temp": "lukewarm",
                      "color": "rgba(255, 255, 255, 0.55)",
                      "zone": "09",
                      "value": ".651"
                    },
                    {
                      "temp": "lukewarm",
                      "color": "rgba(255, 255, 255, 0.55)",
                      "zone": "11",
                      "value": ".678"
                    },
                    {
                      "temp": "lukewarm",
                      "color": "rgba(255, 255, 255, 0.55)",
                      "zone": "12",
                      "value": ".774"
                    },
                    {
                      "temp": "cold",
                      "color": "rgba(6, 90, 238, .55)",
                      "zone": "13",
                      "value": ".349"
                    },
                    {
                      "temp": "cold",
                      "color": "rgba(6, 90, 238, .55)",
                      "zone": "14",
                      "value": ".415"
                    }
                  ],
                  "batterHotColdZoneStats": {
                    "stats": [
                      {
                        "splits": [
                          {
                            "stat": {
                              "name": "onBasePlusSlugging",
                              "zones": [
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "01",
                                  "value": ".935"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "02",
                                  "value": ".769"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "03",
                                  "value": ".722"
                                },
                                {
                                  "temp": "hot",
                                  "color": "rgba(214, 41, 52, .55)",
                                  "zone": "04",
                                  "value": "1.196"
                                },
                                {
                                  "temp": "warm",
                                  "color": "rgba(234, 147, 153, .55)",
                                  "zone": "05",
                                  "value": ".952"
                                },
                                {
                                  "temp": "cold",
                                  "color": "rgba(6, 90, 238, .55)",
                                  "zone": "06",
                                  "value": ".407"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "07",
                                  "value": ".714"
                                },
                                {
                                  "temp": "warm",
                                  "color": "rgba(234, 147, 153, .55)",
                                  "zone": "08",
                                  "value": "1.023"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "09",
                                  "value": ".651"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "11",
                                  "value": ".678"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "12",
                                  "value": ".774"
                                },
                                {
                                  "temp": "cold",
                                  "color": "rgba(6, 90, 238, .55)",
                                  "zone": "13",
                                  "value": ".349"
                                },
                                {
                                  "temp": "cold",
                                  "color": "rgba(6, 90, 238, .55)",
                                  "zone": "14",
                                  "value": ".415"
                                }
                              ]
                            }
                          },
                          {
                            "stat": {
                              "name": "battingAverage",
                              "zones": [
                                {
                                  "temp": "warm",
                                  "color": "rgba(234, 147, 153, .55)",
                                  "zone": "01",
                                  "value": ".345"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "02",
                                  "value": ".289"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "03",
                                  "value": ".278"
                                },
                                {
                                  "temp": "hot",
                                  "color": "rgba(214, 41, 52, .55)",
                                  "zone": "04",
                                  "value": ".463"
                                },
                                {
                                  "temp": "warm",
                                  "color": "rgba(234, 147, 153, .55)",
                                  "zone": "05",
                                  "value": ".344"
                                },
                                {
                                  "temp": "cold",
                                  "color": "rgba(6, 90, 238, .55)",
                                  "zone": "06",
                                  "value": ".167"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "07",
                                  "value": ".286"
                                },
                                {
                                  "temp": "warm",
                                  "color": "rgba(234, 147, 153, .55)",
                                  "zone": "08",
                                  "value": ".349"
                                },
                                {
                                  "temp": "warm",
                                  "color": "rgba(234, 147, 153, .55)",
                                  "zone": "09",
                                  "value": ".302"
                                },
                                {
                                  "temp": "cool",
                                  "color": "rgba(150, 188, 255, .55)",
                                  "zone": "11",
                                  "value": ".250"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "12",
                                  "value": ".280"
                                },
                                {
                                  "temp": "cold",
                                  "color": "rgba(6, 90, 238, .55)",
                                  "zone": "13",
                                  "value": ".033"
                                },
                                {
                                  "temp": "cold",
                                  "color": "rgba(6, 90, 238, .55)",
                                  "zone": "14",
                                  "value": ".121"
                                }
                              ]
                            }
                          },
                          {
                            "stat": {
                              "name": "exitVelocity",
                              "zones": [
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "01",
                                  "value": "90.04"
                                },
                                {
                                  "temp": "hot",
                                  "color": "rgba(214, 41, 52, .55)",
                                  "zone": "02",
                                  "value": "94.45"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "03",
                                  "value": "90.85"
                                },
                                {
                                  "temp": "hot",
                                  "color": "rgba(214, 41, 52, .55)",
                                  "zone": "04",
                                  "value": "93.61"
                                },
                                {
                                  "temp": "hot",
                                  "color": "rgba(214, 41, 52, .55)",
                                  "zone": "05",
                                  "value": "96.23"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "06",
                                  "value": "89.43"
                                },
                                {
                                  "temp": "warm",
                                  "color": "rgba(234, 147, 153, .55)",
                                  "zone": "07",
                                  "value": "91.79"
                                },
                                {
                                  "temp": "lukewarm",
                                  "color": "rgba(255, 255, 255, 0.55)",
                                  "zone": "08",
                                  "value": "90.72"
                                },
                                {
                                  "temp": "cold",
                                  "color": "rgba(6, 90, 238, .55)",
                                  "zone": "09",
                                  "value": "81.56"
                                },
                                {
                                  "temp": "cold",
                                  "color": "rgba(6, 90, 238, .55)",
                                  "zone": "11",
                                  "value": "80.10"
                                },
                                {
                                  "temp": "cold",
                                  "color": "rgba(6, 90, 238, .55)",
                                  "zone": "12",
                                  "value": "82.77"
                                },
                                {
                                  "temp": "cold",
                                  "color": "rgba(6, 90, 238, .55)",
                                  "zone": "13",
                                  "value": "82.06"
                                },
                                {
                                  "temp": "cold",
                                  "color": "rgba(6, 90, 238, .55)",
                                  "zone": "14",
                                  "value": "77.15"
                                }
                              ]
                            }
                          }
                        ],
                        "exemptions": [],
                        "type": {
                          "displayName": "hotColdZones"
                        },
                        "group": {
                          "displayName": "hitting"
                        }
                      }
                    ]
                  },
                  "pitcher": {
                    "link": "/api/v1/people/661403",
                    "fullName": "Emmanuel Clase",
                    "id": 661403
                  },
                  "pitcherHotColdZones": [],
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                }
              },
              {
                "result": {
                  "homeScore": 5,
                  "awayScore": 2,
                  "rbi": 0,
                  "description": "Jose Ramirez flies out to center fielder Cedric Mullins.",
                  "isOut": true,
                  "eventType": "field_out",
                  "type": "atBat",
                  "event": "Flyout"
                },
                "actionIndex": [
                  1
                ],
                "runnerIndex": [
                  0
                ],
                "pitchIndex": [
                  2,
                  3
                ],
                "playEndTime": "2023-09-22T02:11:53.891Z",
                "about": {
                  "hasOut": true,
                  "captivatingIndex": 0,
                  "inning": 8,
                  "isScoringPlay": false,
                  "atBatIndex": 69,
                  "startTime": "2023-09-22T02:11:17.395Z",
                  "isTopInning": false,
                  "endTime": "2023-09-22T02:11:53.891Z",
                  "hasReview": false,
                  "halfInning": "bottom",
                  "isComplete": true
                },
                "count": {
                  "outs": 3,
                  "balls": 1,
                  "strikes": 0
                },
                "atBatIndex": 69,
                "runners": [
                  {
                    "credits": [
                      {
                        "position": {
                          "code": "8",
                          "name": "Outfielder",
                          "type": "Outfielder",
                          "abbreviation": "CF"
                        },
                        "credit": "f_putout",
                        "player": {
                          "link": "/api/v1/people/656775",
                          "id": 656775
                        }
                      }
                    ],
                    "details": {
                      "playIndex": 3,
                      "responsiblePitcher": null,
                      "earned": false,
                      "rbi": false,
                      "teamUnearned": false,
                      "eventType": "field_out",
                      "isScoringEvent": false,
                      "event": "Flyout",
                      "runner": {
                        "link": "/api/v1/people/608070",
                        "fullName": "Jose Ramirez",
                        "id": 608070
                      },
                      "movementReason": null
                    },
                    "movement": {
                      "outNumber": 3,
                      "outBase": "1B",
                      "start": null,
                      "isOut": true,
                      "end": null,
                      "originBase": null
                    }
                  }
                ],
                "playEvents": [
                  {
                    "isPitch": false,
                    "count": {
                      "outs": 2,
                      "balls": 0,
                      "strikes": 0
                    },
                    "index": 0,
                    "details": {
                      "homeScore": 5,
                      "awayScore": 2,
                      "isScoringPlay": false,
                      "description": "Mound Visit.",
                      "isOut": false,
                      "eventType": "mound_visit",
                      "event": "Mound Visit",
                      "hasReview": false
                    },
                    "startTime": "2023-09-22T02:08:03.897Z",
                    "endTime": "2023-09-22T02:10:24.927Z",
                    "type": "action"
                  },
                  {
                    "isPitch": false,
                    "count": {
                      "outs": 2,
                      "balls": 0,
                      "strikes": 0
                    },
                    "index": 1,
                    "details": {
                      "homeScore": 5,
                      "awayScore": 2,
                      "isScoringPlay": false,
                      "description": "Pitching Change: Mike Baumann replaces Jacob Webb.",
                      "isOut": false,
                      "eventType": "pitching_substitution",
                      "event": "Pitching Substitution",
                      "hasReview": false
                    },
                    "startTime": "2023-09-22T02:10:24.927Z",
                    "endTime": "2023-09-22T02:11:20.395Z",
                    "isSubstitution": true,
                    "position": {
                      "code": "1",
                      "name": "Pitcher",
                      "type": "Pitcher",
                      "abbreviation": "P"
                    },
                    "type": "action",
                    "player": {
                      "link": "/api/v1/people/657508",
                      "id": 657508
                    }
                  },
                  {
                    "playId": "c325e10b-63fa-4e7b-8e8e-10164b91534c",
                    "pitchData": {
                      "endSpeed": 88.1,
                      "extension": 6.797008849589759,
                      "breaks": {
                        "spinRate": 2253,
                        "breakHorizontal": 10.9,
                        "breakAngle": 9.6,
                        "breakVertical": -15.1,
                        "breakVerticalInduced": 14.5,
                        "spinDirection": 212
                      },
                      "startSpeed": 96.2,
                      "zone": 14,
                      "plateTime": 0.3919853841680423,
                      "coordinates": {
                        "pfxX": -6.799233727419689,
                        "pX": 0.0341605780683154,
                        "pZ": 1.2777099171407775,
                        "pfxZ": 9.086298706493722,
                        "vY0": -139.6635637520898,
                        "vZ0": -9.901370973108968,
                        "vX0": 6.675713117688483,
                        "z0": 5.800651878862087,
                        "y0": 50.00675546290258,
                        "aX": -13.4518444952048,
                        "aY": 31.090273648795524,
                        "x": 115.7,
                        "x0": -1.502256755137928,
                        "aZ": -14.206501123045188,
                        "y": 204.28
                      },
                      "strikeZoneTop": 3.37,
                      "strikeZoneBottom": 1.56
                    },
                    "isPitch": true,
                    "pitchNumber": 1,
                    "count": {
                      "outs": 2,
                      "balls": 1,
                      "strikes": 0
                    },
                    "index": 2,
                    "details": {
                      "call": {
                        "code": "B",
                        "description": "Ball"
                      },
                      "ballColor": "rgba(39, 161, 39, 1.0)",
                      "code": "B",
                      "description": "Ball",
                      "isBall": true,
                      "isOut": false,
                      "type": {
                        "code": "FF",
                        "description": "Four-Seam Fastball"
                      },
                      "trailColor": "rgba(188, 0, 33, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": false
                    },
                    "startTime": "2023-09-22T02:11:20.395Z",
                    "endTime": "2023-09-22T02:11:36.977Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "92ebab77-03f6-4565-ab9d-c9d3b8eff7e4",
                    "pitchData": {
                      "endSpeed": 88.9,
                      "extension": 6.585118492857824,
                      "breaks": {
                        "spinRate": 2356,
                        "breakHorizontal": 9.1,
                        "breakAngle": 14.4,
                        "breakVertical": -12.6,
                        "breakVerticalInduced": 16.4,
                        "spinDirection": 212
                      },
                      "startSpeed": 97.2,
                      "zone": 8,
                      "plateTime": 0.38777431711358856,
                      "coordinates": {
                        "pfxX": -5.825639509930809,
                        "pX": 0.11820959178082557,
                        "pZ": 1.9853492792131107,
                        "pfxZ": 9.942109908608842,
                        "vY0": -141.23658163172482,
                        "vZ0": -8.524577747318114,
                        "vX0": 6.905811756192834,
                        "z0": 5.819580268524764,
                        "y0": 50.002722397404874,
                        "aX": -11.771492112403388,
                        "aY": 32.11363603478548,
                        "x": 112.49,
                        "x0": -1.6014897601405438,
                        "aZ": -12.085921721979487,
                        "y": 185.18
                      },
                      "strikeZoneTop": 3.37,
                      "strikeZoneBottom": 1.56
                    },
                    "isPitch": true,
                    "pitchNumber": 2,
                    "count": {
                      "outs": 2,
                      "balls": 1,
                      "strikes": 0
                    },
                    "index": 3,
                    "details": {
                      "call": {
                        "code": "X",
                        "description": "In play, out(s)"
                      },
                      "ballColor": "rgba(26, 86, 190, 1.0)",
                      "code": "X",
                      "description": "In play, out(s)",
                      "isBall": false,
                      "isOut": true,
                      "type": {
                        "code": "FF",
                        "description": "Four-Seam Fastball"
                      },
                      "trailColor": "rgba(188, 0, 33, 1.0)",
                      "hasReview": false,
                      "isInPlay": true,
                      "isStrike": false
                    },
                    "hitData": {
                      "hardness": "medium",
                      "coordinates": {
                        "coordX": 162.84,
                        "coordY": 50.44
                      },
                      "launchSpeed": 98.3,
                      "location": "8",
                      "totalDistance": 379,
                      "trajectory": "fly_ball",
                      "launchAngle": 32
                    },
                    "startTime": "2023-09-22T02:11:36.977Z",
                    "endTime": "2023-09-22T02:11:53.891Z",
                    "type": "pitch"
                  }
                ],
                "matchup": {
                  "splits": {
                    "batter": "vs_RHP",
                    "menOnBase": "Empty",
                    "pitcher": "vs_LHB"
                  },
                  "batter": {
                    "link": "/api/v1/people/608070",
                    "fullName": "Jose Ramirez",
                    "id": 608070
                  },
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "batterHotColdZones": [],
                  "pitcher": {
                    "link": "/api/v1/people/657508",
                    "fullName": "Mike Baumann",
                    "id": 657508
                  },
                  "pitcherHotColdZones": [],
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                }
              },
              {
                "result": {
                  "homeScore": 5,
                  "awayScore": 2,
                  "rbi": 0,
                  "description": "Steven Kwan walks.",
                  "isOut": false,
                  "eventType": "walk",
                  "type": "atBat",
                  "event": "Walk"
                },
                "actionIndex": [],
                "runnerIndex": [
                  0
                ],
                "pitchIndex": [
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8
                ],
                "playEndTime": "2023-09-22T02:07:48.130Z",
                "about": {
                  "hasOut": false,
                  "captivatingIndex": 0,
                  "inning": 8,
                  "isScoringPlay": false,
                  "atBatIndex": 68,
                  "startTime": "2023-09-22T02:04:58.065Z",
                  "isTopInning": false,
                  "endTime": "2023-09-22T02:07:48.130Z",
                  "hasReview": false,
                  "halfInning": "bottom",
                  "isComplete": true
                },
                "count": {
                  "outs": 2,
                  "balls": 4,
                  "strikes": 2
                },
                "atBatIndex": 68,
                "runners": [
                  {
                    "credits": [],
                    "details": {
                      "playIndex": 8,
                      "responsiblePitcher": null,
                      "earned": false,
                      "rbi": false,
                      "teamUnearned": false,
                      "eventType": "walk",
                      "isScoringEvent": false,
                      "event": "Walk",
                      "runner": {
                        "link": "/api/v1/people/680757",
                        "fullName": "Steven Kwan",
                        "id": 680757
                      },
                      "movementReason": null
                    },
                    "movement": {
                      "outNumber": null,
                      "outBase": null,
                      "start": null,
                      "isOut": false,
                      "end": "1B",
                      "originBase": null
                    }
                  }
                ],
                "playEvents": [
                  {
                    "playId": "564cbb5f-fa3e-42ec-a5b3-bcd1ae90bb36",
                    "pitchData": {
                      "endSpeed": 86.2,
                      "extension": 6.386142265165924,
                      "breaks": {
                        "spinRate": 2638,
                        "breakHorizontal": 6.8,
                        "breakAngle": 22.8,
                        "breakVertical": -11.8,
                        "breakVerticalInduced": 18.7,
                        "spinDirection": 217
                      },
                      "startSpeed": 95.1,
                      "zone": 1,
                      "plateTime": 0.39738500413459166,
                      "coordinates": {
                        "pfxX": -4.689830370779187,
                        "pX": -0.5567936988797126,
                        "pZ": 3.195305667623361,
                        "pfxZ": 10.693405690241088,
                        "vY0": -138.22202809624022,
                        "vZ0": -3.3505540576707813,
                        "vX0": 7.439766292664188,
                        "z0": 5.212618331973657,
                        "y0": 50.001195213369904,
                        "aX": -9.009437624055595,
                        "aY": 32.8939255362807,
                        "x": 138.22,
                        "x0": -2.682896950440506,
                        "aZ": -11.630307268378608,
                        "y": 152.51
                      },
                      "strikeZoneTop": 3.27,
                      "strikeZoneBottom": 1.5
                    },
                    "isPitch": true,
                    "pitchNumber": 1,
                    "count": {
                      "outs": 2,
                      "balls": 0,
                      "strikes": 1
                    },
                    "index": 0,
                    "details": {
                      "call": {
                        "code": "F",
                        "description": "Foul"
                      },
                      "ballColor": "rgba(170, 21, 11, 1.0)",
                      "code": "F",
                      "description": "Foul",
                      "isBall": false,
                      "isOut": false,
                      "type": {
                        "code": "FF",
                        "description": "Four-Seam Fastball"
                      },
                      "trailColor": "rgba(188, 0, 33, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": true
                    },
                    "startTime": "2023-09-22T02:04:59.065Z",
                    "endTime": "2023-09-22T02:05:08.231Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "8fc2123e-e51d-41df-878c-e3978433d7ca",
                    "pitchData": {
                      "endSpeed": 87.1,
                      "extension": 6.3003473846621425,
                      "breaks": {
                        "spinRate": 2553,
                        "breakHorizontal": 6.2,
                        "breakAngle": 20.4,
                        "breakVertical": -11.9,
                        "breakVerticalInduced": 18.2,
                        "spinDirection": 212
                      },
                      "startSpeed": 95,
                      "zone": 1,
                      "plateTime": 0.3956523576456594,
                      "coordinates": {
                        "pfxX": -4.171933734228746,
                        "pX": -0.6896038403526202,
                        "pZ": 3.161460150047543,
                        "pfxZ": 10.386077351339424,
                        "vY0": -138.2164025359456,
                        "vZ0": -3.5539047112421915,
                        "vX0": 6.8035897137906085,
                        "z0": 5.264236171415334,
                        "y0": 50.002045158940184,
                        "aX": -8.106492348455475,
                        "aY": 29.59147818911206,
                        "x": 143.29,
                        "x0": -2.63623838002093,
                        "aZ": -11.993258664316977,
                        "y": 153.42
                      },
                      "strikeZoneTop": 3.27,
                      "strikeZoneBottom": 1.5
                    },
                    "isPitch": true,
                    "pitchNumber": 2,
                    "count": {
                      "outs": 2,
                      "balls": 0,
                      "strikes": 2
                    },
                    "index": 1,
                    "details": {
                      "call": {
                        "code": "C",
                        "description": "Called Strike"
                      },
                      "ballColor": "rgba(170, 21, 11, 1.0)",
                      "code": "C",
                      "description": "Called Strike",
                      "isBall": false,
                      "isOut": false,
                      "type": {
                        "code": "FF",
                        "description": "Four-Seam Fastball"
                      },
                      "trailColor": "rgba(188, 0, 33, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": true
                    },
                    "startTime": "2023-09-22T02:05:08.231Z",
                    "endTime": "2023-09-22T02:05:29.331Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "1e900f94-25a5-408b-a9c6-256bdc383305",
                    "pitchData": {
                      "endSpeed": 87.5,
                      "extension": 6.654229481188462,
                      "breaks": {
                        "spinRate": 2484,
                        "breakHorizontal": 5.5,
                        "breakAngle": 42,
                        "breakVertical": -12.5,
                        "breakVerticalInduced": 17.5,
                        "spinDirection": 216
                      },
                      "startSpeed": 95.4,
                      "zone": 12,
                      "plateTime": 0.39452246893860865,
                      "coordinates": {
                        "pfxX": -4.224620562850923,
                        "pX": 1.0234367679547178,
                        "pZ": 2.652836723441787,
                        "pfxZ": 10.138098805073103,
                        "vY0": -138.57068827080695,
                        "vZ0": -4.830395914419228,
                        "vX0": 10.765497448768858,
                        "z0": 5.237824293971248,
                        "y0": 50.00471140469327,
                        "aX": -8.256236951485466,
                        "aY": 29.548759659698874,
                        "x": 77.99,
                        "x0": -2.3547272808976625,
                        "aZ": -12.36562315554592,
                        "y": 167.15
                      },
                      "strikeZoneTop": 3.27,
                      "strikeZoneBottom": 1.5
                    },
                    "isPitch": true,
                    "pitchNumber": 3,
                    "count": {
                      "outs": 2,
                      "balls": 1,
                      "strikes": 2
                    },
                    "index": 2,
                    "details": {
                      "call": {
                        "code": "B",
                        "description": "Ball"
                      },
                      "ballColor": "rgba(39, 161, 39, 1.0)",
                      "code": "B",
                      "description": "Ball",
                      "isBall": true,
                      "isOut": false,
                      "type": {
                        "code": "FF",
                        "description": "Four-Seam Fastball"
                      },
                      "trailColor": "rgba(188, 0, 33, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": false
                    },
                    "startTime": "2023-09-22T02:05:29.331Z",
                    "endTime": "2023-09-22T02:05:51.100Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "737f7707-d185-4e76-8d6e-fe11358e9852",
                    "pitchData": {
                      "endSpeed": 78.4,
                      "extension": 5.98403268229964,
                      "breaks": {
                        "spinRate": 2462,
                        "breakHorizontal": -14.3,
                        "breakAngle": 50.4,
                        "breakVertical": -36.8,
                        "breakVerticalInduced": 0.8,
                        "spinDirection": 47
                      },
                      "startSpeed": 84.9,
                      "zone": 4,
                      "plateTime": 0.44247345396636684,
                      "coordinates": {
                        "pfxX": 7.379168696220734,
                        "pX": -0.40261876782501826,
                        "pZ": 2.1593951279988555,
                        "pfxZ": 0.4995954006662924,
                        "vY0": -123.67803603610687,
                        "vZ0": -1.133003630835937,
                        "vX0": 3.766748344210222,
                        "z0": 5.25086108399113,
                        "y0": 50.00229610412329,
                        "aX": 11.45625245590241,
                        "aY": 24.115770529949646,
                        "x": 132.35,
                        "x0": -2.902804765243864,
                        "aZ": -31.39485926363225,
                        "y": 180.48
                      },
                      "strikeZoneTop": 3.27,
                      "strikeZoneBottom": 1.5
                    },
                    "isPitch": true,
                    "pitchNumber": 4,
                    "count": {
                      "outs": 2,
                      "balls": 1,
                      "strikes": 2
                    },
                    "index": 3,
                    "details": {
                      "call": {
                        "code": "F",
                        "description": "Foul"
                      },
                      "ballColor": "rgba(170, 21, 11, 1.0)",
                      "code": "F",
                      "description": "Foul",
                      "isBall": false,
                      "isOut": false,
                      "type": {
                        "code": "ST",
                        "description": "Sweeper"
                      },
                      "trailColor": "rgba(50, 50, 50, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": true
                    },
                    "startTime": "2023-09-22T02:05:51.100Z",
                    "endTime": "2023-09-22T02:06:16.218Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "31560861-6a1a-44e6-bebb-47dd8d30eed6",
                    "pitchData": {
                      "endSpeed": 86.6,
                      "extension": 6.388780460478655,
                      "breaks": {
                        "spinRate": 2494,
                        "breakHorizontal": 9.7,
                        "breakAngle": 24,
                        "breakVertical": -13.9,
                        "breakVerticalInduced": 16.4,
                        "spinDirection": 214
                      },
                      "startSpeed": 95.4,
                      "zone": 2,
                      "plateTime": 0.39611026547513495,
                      "coordinates": {
                        "pfxX": -6.4755442069188165,
                        "pX": -0.06143249943473256,
                        "pZ": 3.0970065474693795,
                        "pfxZ": 9.38473363966197,
                        "vY0": -138.55040330579942,
                        "vZ0": -3.376878145238358,
                        "vX0": 9.079505796752505,
                        "z0": 5.27559691431921,
                        "y0": 50.00359186603086,
                        "aX": -12.525589159265662,
                        "aY": 32.455749368355214,
                        "x": 119.34,
                        "x0": -2.547554837792809,
                        "aZ": -14.023915181290382,
                        "y": 155.16
                      },
                      "strikeZoneTop": 3.27,
                      "strikeZoneBottom": 1.5
                    },
                    "isPitch": true,
                    "pitchNumber": 5,
                    "count": {
                      "outs": 2,
                      "balls": 1,
                      "strikes": 2
                    },
                    "index": 4,
                    "details": {
                      "call": {
                        "code": "F",
                        "description": "Foul"
                      },
                      "ballColor": "rgba(170, 21, 11, 1.0)",
                      "code": "F",
                      "description": "Foul",
                      "isBall": false,
                      "isOut": false,
                      "type": {
                        "code": "FF",
                        "description": "Four-Seam Fastball"
                      },
                      "trailColor": "rgba(188, 0, 33, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": true
                    },
                    "startTime": "2023-09-22T02:06:16.218Z",
                    "endTime": "2023-09-22T02:06:38.574Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "bd96e825-d9c7-45a0-a37e-05403ee8aed2",
                    "pitchData": {
                      "endSpeed": 78.4,
                      "extension": 6.903251064736474,
                      "breaks": {
                        "spinRate": 2240,
                        "breakHorizontal": 16.8,
                        "breakAngle": 9.6,
                        "breakVertical": -24.7,
                        "breakVerticalInduced": 12.6,
                        "spinDirection": 234
                      },
                      "startSpeed": 85.6,
                      "zone": 1,
                      "plateTime": 0.4395853303749293,
                      "coordinates": {
                        "pfxX": -10.306502322983498,
                        "pX": -0.5253008307579329,
                        "pZ": 2.9346854625890946,
                        "pfxZ": 7.02454767896606,
                        "vY0": -124.47251898237721,
                        "vZ0": -1.716104479595165,
                        "vX0": 8.09509829098629,
                        "z0": 5.3770276937929955,
                        "y0": 50.00109064624654,
                        "aX": -16.21473698516341,
                        "aY": 24.351074338946173,
                        "x": 137.02,
                        "x0": -2.476314164420066,
                        "aZ": -21.120168718583137,
                        "y": 159.54
                      },
                      "strikeZoneTop": 3.27,
                      "strikeZoneBottom": 1.5
                    },
                    "isPitch": true,
                    "pitchNumber": 6,
                    "count": {
                      "outs": 2,
                      "balls": 1,
                      "strikes": 2
                    },
                    "index": 5,
                    "details": {
                      "call": {
                        "code": "F",
                        "description": "Foul"
                      },
                      "ballColor": "rgba(170, 21, 11, 1.0)",
                      "code": "F",
                      "description": "Foul",
                      "isBall": false,
                      "isOut": false,
                      "type": {
                        "code": "CH",
                        "description": "Changeup"
                      },
                      "trailColor": "rgba(0, 85, 254, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": true
                    },
                    "startTime": "2023-09-22T02:06:38.574Z",
                    "endTime": "2023-09-22T02:07:00.625Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "8840b725-63f4-4dc2-b8c0-66a348fe29bd",
                    "pitchData": {
                      "endSpeed": 79.9,
                      "extension": 6.591462062182406,
                      "breaks": {
                        "spinRate": 2236,
                        "breakHorizontal": 16.6,
                        "breakAngle": 15.6,
                        "breakVertical": -25,
                        "breakVerticalInduced": 11.4,
                        "spinDirection": 239
                      },
                      "startSpeed": 86.9,
                      "zone": 13,
                      "plateTime": 0.4335397260538594,
                      "coordinates": {
                        "pfxX": -10.259095084659164,
                        "pX": -0.003486232578002057,
                        "pZ": 0.9990512541309193,
                        "pfxZ": 6.950772301197729,
                        "vY0": -126.20125031495624,
                        "vZ0": -6.284373525658199,
                        "vX0": 9.190198369294208,
                        "z0": 5.20118501390754,
                        "y0": 50.00540325971089,
                        "aX": -16.59636620608192,
                        "aY": 25.0198987507114,
                        "x": 117.13,
                        "x0": -2.3545317030002604,
                        "aZ": -20.93698634202638,
                        "y": 211.81
                      },
                      "strikeZoneTop": 3.27,
                      "strikeZoneBottom": 1.5
                    },
                    "isPitch": true,
                    "pitchNumber": 7,
                    "count": {
                      "outs": 2,
                      "balls": 2,
                      "strikes": 2
                    },
                    "index": 6,
                    "details": {
                      "call": {
                        "code": "B",
                        "description": "Ball"
                      },
                      "ballColor": "rgba(39, 161, 39, 1.0)",
                      "code": "B",
                      "description": "Ball",
                      "isBall": true,
                      "isOut": false,
                      "type": {
                        "code": "CH",
                        "description": "Changeup"
                      },
                      "trailColor": "rgba(0, 85, 254, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": false
                    },
                    "startTime": "2023-09-22T02:07:00.625Z",
                    "endTime": "2023-09-22T02:07:18.238Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "e82e5a27-aa2f-4bc7-ab56-64cf1e520a90",
                    "pitchData": {
                      "endSpeed": 78.5,
                      "extension": 6.255954864850808,
                      "breaks": {
                        "spinRate": 2556,
                        "breakHorizontal": -8.9,
                        "breakAngle": 36,
                        "breakVertical": -40,
                        "breakVerticalInduced": -2.2,
                        "spinDirection": 40
                      },
                      "startSpeed": 84.6,
                      "zone": 13,
                      "plateTime": 0.4427645398421789,
                      "coordinates": {
                        "pfxX": 4.545120132679286,
                        "pX": -1.1035583207722506,
                        "pZ": 2.1910166568419913,
                        "pfxZ": -1.2393105259437593,
                        "vY0": -123.31439431665244,
                        "vZ0": -0.5956278977896072,
                        "vX0": 3.1112260098631217,
                        "z0": 5.291516127685892,
                        "y0": 50.00344926110047,
                        "aX": 7.05763444798886,
                        "aY": 22.58694770942168,
                        "x": 159.07,
                        "x0": -2.9684599254372985,
                        "aZ": -34.0980122919435,
                        "y": 179.62
                      },
                      "strikeZoneTop": 3.27,
                      "strikeZoneBottom": 1.5
                    },
                    "isPitch": true,
                    "pitchNumber": 8,
                    "count": {
                      "outs": 2,
                      "balls": 3,
                      "strikes": 2
                    },
                    "index": 7,
                    "details": {
                      "call": {
                        "code": "B",
                        "description": "Ball"
                      },
                      "ballColor": "rgba(39, 161, 39, 1.0)",
                      "code": "B",
                      "description": "Ball",
                      "isBall": true,
                      "isOut": false,
                      "type": {
                        "code": "ST",
                        "description": "Sweeper"
                      },
                      "trailColor": "rgba(50, 50, 50, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": false
                    },
                    "startTime": "2023-09-22T02:07:18.238Z",
                    "endTime": "2023-09-22T02:07:40.379Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "6f06571c-27bb-4b11-a1e2-002e646a7083",
                    "pitchData": {
                      "endSpeed": 87,
                      "extension": 6.530548941107986,
                      "breaks": {
                        "spinRate": 2457,
                        "breakHorizontal": 7.8,
                        "breakAngle": 10.8,
                        "breakVertical": -13,
                        "breakVerticalInduced": 17,
                        "spinDirection": 219
                      },
                      "startSpeed": 95.5,
                      "zone": 11,
                      "plateTime": 0.3945124586687725,
                      "coordinates": {
                        "pfxX": -4.954630195925503,
                        "pX": -1.3868083299778982,
                        "pZ": 3.7405397496926347,
                        "pfxZ": 9.53136542274556,
                        "vY0": -138.96297518019432,
                        "vZ0": -1.772021722989578,
                        "vX0": 5.4179024835238305,
                        "z0": 5.291241459817547,
                        "y0": 50.005398514222776,
                        "aX": -9.66815547138881,
                        "aY": 31.846977381698036,
                        "x": 169.86,
                        "x0": -2.720294383612224,
                        "aZ": -13.581465216791184,
                        "y": 137.79
                      },
                      "strikeZoneTop": 3.27,
                      "strikeZoneBottom": 1.5
                    },
                    "isPitch": true,
                    "pitchNumber": 9,
                    "count": {
                      "outs": 2,
                      "balls": 4,
                      "strikes": 2
                    },
                    "index": 8,
                    "details": {
                      "call": {
                        "code": "B",
                        "description": "Ball"
                      },
                      "ballColor": "rgba(39, 161, 39, 1.0)",
                      "code": "B",
                      "description": "Ball",
                      "isBall": true,
                      "isOut": false,
                      "type": {
                        "code": "FF",
                        "description": "Four-Seam Fastball"
                      },
                      "trailColor": "rgba(188, 0, 33, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": false
                    },
                    "startTime": "2023-09-22T02:07:40.379Z",
                    "endTime": "2023-09-22T02:07:48.130Z",
                    "type": "pitch"
                  }
                ],
                "matchup": {
                  "splits": {
                    "batter": "vs_RHP",
                    "menOnBase": "Loaded",
                    "pitcher": "vs_LHB"
                  },
                  "batter": {
                    "link": "/api/v1/people/680757",
                    "fullName": "Steven Kwan",
                    "id": 680757
                  },
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "postOnThird": {
                    "link": "/api/v1/people/664702",
                    "fullName": "Myles Straw",
                    "id": 664702
                  },
                  "batterHotColdZones": [],
                  "postOnFirst": {
                    "link": "/api/v1/people/680757",
                    "fullName": "Steven Kwan",
                    "id": 680757
                  },
                  "pitcher": {
                    "link": "/api/v1/people/657097",
                    "fullName": "Jacob Webb",
                    "id": 657097
                  },
                  "pitcherHotColdZones": [],
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  },
                  "postOnSecond": {
                    "link": "/api/v1/people/666310",
                    "fullName": "Bo Naylor",
                    "id": 666310
                  }
                }
              },
              {
                "result": {
                  "homeScore": 5,
                  "awayScore": 2,
                  "rbi": 1,
                  "description": "Gabriel Arias grounds out, pitcher Jacob Webb to first baseman Ryan O'Hearn.   Ramon Laureano scores.    Myles Straw to 3rd.    Bo Naylor to 2nd.",
                  "isOut": true,
                  "eventType": "field_out",
                  "type": "atBat",
                  "event": "Groundout"
                },
                "actionIndex": [],
                "runnerIndex": [
                  0,
                  1,
                  2,
                  3
                ],
                "pitchIndex": [
                  1,
                  2
                ],
                "playEndTime": "2023-09-22T02:04:56.965Z",
                "about": {
                  "hasOut": true,
                  "captivatingIndex": 0,
                  "inning": 8,
                  "isScoringPlay": true,
                  "atBatIndex": 67,
                  "startTime": "2023-09-22T02:03:46.345Z",
                  "isTopInning": false,
                  "endTime": "2023-09-22T02:04:56.965Z",
                  "hasReview": false,
                  "halfInning": "bottom",
                  "isComplete": true
                },
                "count": {
                  "outs": 2,
                  "balls": 0,
                  "strikes": 1
                },
                "atBatIndex": 67,
                "runners": [
                  {
                    "credits": [
                      {
                        "position": {
                          "code": "1",
                          "name": "Pitcher",
                          "type": "Pitcher",
                          "abbreviation": "P"
                        },
                        "credit": "f_assist",
                        "player": {
                          "link": "/api/v1/people/657097",
                          "id": 657097
                        }
                      },
                      {
                        "position": {
                          "code": "3",
                          "name": "First Base",
                          "type": "Infielder",
                          "abbreviation": "1B"
                        },
                        "credit": "f_putout",
                        "player": {
                          "link": "/api/v1/people/656811",
                          "id": 656811
                        }
                      }
                    ],
                    "details": {
                      "playIndex": 2,
                      "responsiblePitcher": null,
                      "earned": false,
                      "rbi": false,
                      "teamUnearned": false,
                      "eventType": "field_out",
                      "isScoringEvent": false,
                      "event": "Groundout",
                      "runner": {
                        "link": "/api/v1/people/672356",
                        "fullName": "Gabriel Arias",
                        "id": 672356
                      },
                      "movementReason": null
                    },
                    "movement": {
                      "outNumber": 2,
                      "outBase": "1B",
                      "start": null,
                      "isOut": true,
                      "end": null,
                      "originBase": null
                    }
                  },
                  {
                    "credits": [],
                    "details": {
                      "playIndex": 2,
                      "responsiblePitcher": {
                        "link": "/api/v1/people/672335",
                        "id": 672335
                      },
                      "earned": true,
                      "rbi": true,
                      "teamUnearned": false,
                      "eventType": "field_out",
                      "isScoringEvent": true,
                      "event": "Groundout",
                      "runner": {
                        "link": "/api/v1/people/657656",
                        "fullName": "Ramon Laureano",
                        "id": 657656
                      },
                      "movementReason": "r_adv_force"
                    },
                    "movement": {
                      "outNumber": null,
                      "outBase": null,
                      "start": "3B",
                      "isOut": false,
                      "end": "score",
                      "originBase": "3B"
                    }
                  },
                  {
                    "credits": [],
                    "details": {
                      "playIndex": 2,
                      "responsiblePitcher": null,
                      "earned": false,
                      "rbi": false,
                      "teamUnearned": false,
                      "eventType": "field_out",
                      "isScoringEvent": false,
                      "event": "Groundout",
                      "runner": {
                        "link": "/api/v1/people/664702",
                        "fullName": "Myles Straw",
                        "id": 664702
                      },
                      "movementReason": "r_adv_force"
                    },
                    "movement": {
                      "outNumber": null,
                      "outBase": null,
                      "start": "2B",
                      "isOut": false,
                      "end": "3B",
                      "originBase": "2B"
                    }
                  },
                  {
                    "credits": [],
                    "details": {
                      "playIndex": 2,
                      "responsiblePitcher": null,
                      "earned": false,
                      "rbi": false,
                      "teamUnearned": false,
                      "eventType": "field_out",
                      "isScoringEvent": false,
                      "event": "Groundout",
                      "runner": {
                        "link": "/api/v1/people/666310",
                        "fullName": "Bo Naylor",
                        "id": 666310
                      },
                      "movementReason": "r_adv_force"
                    },
                    "movement": {
                      "outNumber": null,
                      "outBase": null,
                      "start": "1B",
                      "isOut": false,
                      "end": "2B",
                      "originBase": "1B"
                    }
                  }
                ],
                "playEvents": [
                  {
                    "isPitch": false,
                    "count": {
                      "outs": 1,
                      "balls": 0,
                      "strikes": 0
                    },
                    "index": 0,
                    "details": {
                      "homeScore": 4,
                      "awayScore": 2,
                      "isScoringPlay": false,
                      "description": "Batter Timeout.",
                      "isOut": false,
                      "eventType": "batter_timeout",
                      "event": "Batter Timeout",
                      "hasReview": false
                    },
                    "startTime": "2023-09-22T02:03:27.752Z",
                    "endTime": "2023-09-22T02:03:49.345Z",
                    "type": "action",
                    "player": {
                      "link": "/api/v1/people/672356",
                      "id": 672356
                    }
                  },
                  {
                    "playId": "fef32671-454c-4ffb-8daa-4ec63053257f",
                    "pitchData": {
                      "endSpeed": 79.1,
                      "extension": 6.32436599940962,
                      "breaks": {
                        "spinRate": 2661,
                        "breakHorizontal": -14.8,
                        "breakAngle": 70.8,
                        "breakVertical": -39.7,
                        "breakVerticalInduced": -2.2,
                        "spinDirection": 36
                      },
                      "startSpeed": 85.5,
                      "zone": 14,
                      "plateTime": 0.4406674366279888,
                      "coordinates": {
                        "pfxX": 7.198923036081767,
                        "pX": 1.125269200711106,
                        "pZ": 0.8354294979043598,
                        "pfxZ": -0.8222366184423104,
                        "vY0": -124.36378626634846,
                        "vZ0": -3.983246232874172,
                        "vX0": 7.1844065017033625,
                        "z0": 5.2378137878187205,
                        "y0": 50.003705956505094,
                        "aX": 11.260581388032861,
                        "aY": 25.284409237353167,
                        "x": 74.11,
                        "x0": -2.7379786091439047,
                        "aZ": -33.4637158610014,
                        "y": 216.22
                      },
                      "strikeZoneTop": 3.45,
                      "strikeZoneBottom": 1.55
                    },
                    "isPitch": true,
                    "pitchNumber": 1,
                    "count": {
                      "outs": 1,
                      "balls": 0,
                      "strikes": 1
                    },
                    "index": 1,
                    "details": {
                      "call": {
                        "code": "S",
                        "description": "Swinging Strike"
                      },
                      "ballColor": "rgba(170, 21, 11, 1.0)",
                      "code": "S",
                      "description": "Swinging Strike",
                      "isBall": false,
                      "isOut": false,
                      "type": {
                        "code": "ST",
                        "description": "Sweeper"
                      },
                      "trailColor": "rgba(50, 50, 50, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": true
                    },
                    "startTime": "2023-09-22T02:03:49.345Z",
                    "endTime": "2023-09-22T02:04:07.061Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "90341465-71d6-4917-bc15-638ba6f6c7a0",
                    "pitchData": {
                      "endSpeed": 79.6,
                      "extension": 6.196846482934467,
                      "breaks": {
                        "spinRate": 2741,
                        "breakHorizontal": -15.7,
                        "breakAngle": 72,
                        "breakVertical": -37.1,
                        "breakVerticalInduced": -0.2,
                        "spinDirection": 38
                      },
                      "startSpeed": 86.2,
                      "zone": 14,
                      "plateTime": 0.4366584707128882,
                      "coordinates": {
                        "pfxX": 7.778179738397516,
                        "pX": 1.1205534237790962,
                        "pZ": 2.183732449405507,
                        "pfxZ": -0.12298583593150703,
                        "vY0": -125.41585337741809,
                        "vZ0": -1.2388147023279028,
                        "vX0": 7.0648145605669574,
                        "z0": 5.322731433426159,
                        "y0": 50.00081376663514,
                        "aX": 12.39360687611112,
                        "aY": 25.261649699404025,
                        "x": 74.29,
                        "x0": -2.7427047737868593,
                        "aZ": -32.36623557442093,
                        "y": 179.82
                      },
                      "strikeZoneTop": 3.45,
                      "strikeZoneBottom": 1.55
                    },
                    "isPitch": true,
                    "pitchNumber": 2,
                    "count": {
                      "outs": 1,
                      "balls": 0,
                      "strikes": 1
                    },
                    "index": 2,
                    "details": {
                      "call": {
                        "code": "E",
                        "description": "In play, run(s)"
                      },
                      "ballColor": "rgba(26, 86, 190, 1.0)",
                      "code": "E",
                      "description": "In play, run(s)",
                      "isBall": false,
                      "isOut": true,
                      "type": {
                        "code": "ST",
                        "description": "Sweeper"
                      },
                      "trailColor": "rgba(50, 50, 50, 1.0)",
                      "hasReview": false,
                      "isInPlay": true,
                      "isStrike": false
                    },
                    "hitData": {
                      "hardness": "medium",
                      "coordinates": {
                        "coordX": 134.58,
                        "coordY": 191.82
                      },
                      "launchSpeed": 62,
                      "location": "1",
                      "totalDistance": 2,
                      "trajectory": "ground_ball",
                      "launchAngle": -70
                    },
                    "startTime": "2023-09-22T02:04:07.061Z",
                    "endTime": "2023-09-22T02:04:56.965Z",
                    "type": "pitch"
                  }
                ],
                "matchup": {
                  "splits": {
                    "batter": "vs_RHP",
                    "menOnBase": "RISP",
                    "pitcher": "vs_RHB"
                  },
                  "batter": {
                    "link": "/api/v1/people/672356",
                    "fullName": "Gabriel Arias",
                    "id": 672356
                  },
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "postOnThird": {
                    "link": "/api/v1/people/664702",
                    "fullName": "Myles Straw",
                    "id": 664702
                  },
                  "batterHotColdZones": [],
                  "pitcher": {
                    "link": "/api/v1/people/657097",
                    "fullName": "Jacob Webb",
                    "id": 657097
                  },
                  "pitcherHotColdZones": [],
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  },
                  "postOnSecond": {
                    "link": "/api/v1/people/666310",
                    "fullName": "Bo Naylor",
                    "id": 666310
                  }
                }
              },
              {
                "result": {
                  "homeScore": 4,
                  "awayScore": 2,
                  "rbi": 1,
                  "description": "Bo Naylor singles on a pop up to second baseman Adam Frazier.   Andres Gimenez scores.    Ramon Laureano to 3rd.    Myles Straw to 2nd.",
                  "isOut": false,
                  "eventType": "single",
                  "type": "atBat",
                  "event": "Single"
                },
                "actionIndex": [
                  0
                ],
                "runnerIndex": [
                  0,
                  1,
                  2,
                  3
                ],
                "pitchIndex": [
                  1,
                  2
                ],
                "playEndTime": "2023-09-22T02:03:17.352Z",
                "about": {
                  "hasOut": false,
                  "captivatingIndex": 70,
                  "inning": 8,
                  "isScoringPlay": true,
                  "atBatIndex": 66,
                  "startTime": "2023-09-22T02:02:16.040Z",
                  "isTopInning": false,
                  "endTime": "2023-09-22T02:03:17.352Z",
                  "hasReview": false,
                  "halfInning": "bottom",
                  "isComplete": true
                },
                "count": {
                  "outs": 1,
                  "balls": 0,
                  "strikes": 1
                },
                "atBatIndex": 66,
                "runners": [
                  {
                    "credits": [
                      {
                        "position": {
                          "code": "4",
                          "name": "Second Base",
                          "type": "Infielder",
                          "abbreviation": "2B"
                        },
                        "credit": "f_fielded_ball",
                        "player": {
                          "link": "/api/v1/people/624428",
                          "id": 624428
                        }
                      }
                    ],
                    "details": {
                      "playIndex": 2,
                      "responsiblePitcher": null,
                      "earned": false,
                      "rbi": false,
                      "teamUnearned": false,
                      "eventType": "single",
                      "isScoringEvent": false,
                      "event": "Single",
                      "runner": {
                        "link": "/api/v1/people/666310",
                        "fullName": "Bo Naylor",
                        "id": 666310
                      },
                      "movementReason": null
                    },
                    "movement": {
                      "outNumber": null,
                      "outBase": null,
                      "start": null,
                      "isOut": false,
                      "end": "1B",
                      "originBase": null
                    }
                  },
                  {
                    "credits": [],
                    "details": {
                      "playIndex": 2,
                      "responsiblePitcher": {
                        "link": "/api/v1/people/672335",
                        "id": 672335
                      },
                      "earned": true,
                      "rbi": true,
                      "teamUnearned": false,
                      "eventType": "single",
                      "isScoringEvent": true,
                      "event": "Single",
                      "runner": {
                        "link": "/api/v1/people/665926",
                        "fullName": "Andres Gimenez",
                        "id": 665926
                      },
                      "movementReason": "r_adv_force"
                    },
                    "movement": {
                      "outNumber": null,
                      "outBase": null,
                      "start": "3B",
                      "isOut": false,
                      "end": "score",
                      "originBase": "3B"
                    }
                  },
                  {
                    "credits": [],
                    "details": {
                      "playIndex": 2,
                      "responsiblePitcher": null,
                      "earned": false,
                      "rbi": false,
                      "teamUnearned": false,
                      "eventType": "single",
                      "isScoringEvent": false,
                      "event": "Single",
                      "runner": {
                        "link": "/api/v1/people/657656",
                        "fullName": "Ramon Laureano",
                        "id": 657656
                      },
                      "movementReason": "r_adv_force"
                    },
                    "movement": {
                      "outNumber": null,
                      "outBase": null,
                      "start": "2B",
                      "isOut": false,
                      "end": "3B",
                      "originBase": "2B"
                    }
                  },
                  {
                    "credits": [],
                    "details": {
                      "playIndex": 2,
                      "responsiblePitcher": null,
                      "earned": false,
                      "rbi": false,
                      "teamUnearned": false,
                      "eventType": "single",
                      "isScoringEvent": false,
                      "event": "Single",
                      "runner": {
                        "link": "/api/v1/people/664702",
                        "fullName": "Myles Straw",
                        "id": 664702
                      },
                      "movementReason": "r_adv_force"
                    },
                    "movement": {
                      "outNumber": null,
                      "outBase": null,
                      "start": "1B",
                      "isOut": false,
                      "end": "2B",
                      "originBase": "1B"
                    }
                  }
                ],
                "playEvents": [
                  {
                    "battingOrder": "701",
                    "count": {
                      "outs": 1,
                      "balls": 0,
                      "strikes": 0
                    },
                    "index": 0,
                    "type": "action",
                    "replacedPlayer": {
                      "link": "/api/v1/people/686823",
                      "id": 686823
                    },
                    "isPitch": false,
                    "details": {
                      "homeScore": 3,
                      "awayScore": 2,
                      "isScoringPlay": false,
                      "description": "Offensive Substitution: Pinch-runner Myles Straw replaces Will Brennan.",
                      "isOut": false,
                      "eventType": "offensive_substitution",
                      "event": "Offensive Substitution",
                      "hasReview": false
                    },
                    "startTime": "2023-09-22T02:02:01.849Z",
                    "endTime": "2023-09-22T02:02:19.040Z",
                    "isSubstitution": true,
                    "position": {
                      "code": "12",
                      "name": "Pinch Runner",
                      "type": "Runner",
                      "abbreviation": "PR"
                    },
                    "player": {
                      "link": "/api/v1/people/664702",
                      "id": 664702
                    },
                    "base": 1
                  },
                  {
                    "playId": "657b765d-2b45-4ceb-addf-52319962f809",
                    "pitchData": {
                      "endSpeed": 88,
                      "extension": 6.503564530670816,
                      "breaks": {
                        "spinRate": 2593,
                        "breakHorizontal": 9.2,
                        "breakAngle": 25.2,
                        "breakVertical": -10.9,
                        "breakVerticalInduced": 18.6,
                        "spinDirection": 218
                      },
                      "startSpeed": 96.5,
                      "zone": 8,
                      "plateTime": 0.3912392125208206,
                      "coordinates": {
                        "pfxX": -6.162198082597773,
                        "pX": -0.13237615053724314,
                        "pZ": 1.7210991479750923,
                        "pfxZ": 11.070115727579395,
                        "vY0": -140.06201000206758,
                        "vZ0": -7.611998547935647,
                        "vX0": 9.082822793411141,
                        "z0": 5.143392769599715,
                        "y0": 50.00234750520709,
                        "aX": -12.229331102868846,
                        "aY": 31.98101430207762,
                        "x": 122.05,
                        "x0": -2.618393181815361,
                        "aZ": -10.204660715604009,
                        "y": 192.31
                      },
                      "strikeZoneTop": 3.42,
                      "strikeZoneBottom": 1.56
                    },
                    "isPitch": true,
                    "pitchNumber": 1,
                    "count": {
                      "outs": 1,
                      "balls": 0,
                      "strikes": 1
                    },
                    "index": 1,
                    "details": {
                      "call": {
                        "code": "C",
                        "description": "Called Strike"
                      },
                      "ballColor": "rgba(170, 21, 11, 1.0)",
                      "code": "C",
                      "description": "Called Strike",
                      "isBall": false,
                      "isOut": false,
                      "type": {
                        "code": "FF",
                        "description": "Four-Seam Fastball"
                      },
                      "trailColor": "rgba(188, 0, 33, 1.0)",
                      "hasReview": false,
                      "isInPlay": false,
                      "isStrike": true
                    },
                    "startTime": "2023-09-22T02:02:19.040Z",
                    "endTime": "2023-09-22T02:02:40.623Z",
                    "type": "pitch"
                  },
                  {
                    "playId": "50d6f904-7a7a-42e9-9150-65e634e01226",
                    "pitchData": {
                      "endSpeed": 79.8,
                      "extension": 6.445000690541594,
                      "breaks": {
                        "spinRate": 2143,
                        "breakHorizontal": 15.8,
                        "breakAngle": 20.4,
                        "breakVertical": -26.6,
                        "breakVerticalInduced": 9.6,
                        "spinDirection": 240
                      },
                      "startSpeed": 87.1,
                      "zone": 8,
                      "plateTime": 0.4329567436418378,
                      "coordinates": {
                        "pfxX": -9.969458832569728,
                        "pX": 0.2729372306847011,
                        "pZ": 1.9897423598643689,
                        "pfxZ": 5.63532945461279,
                        "vY0": -126.47642997312742,
                        "vZ0": -3.6966389185052,
                        "vX0": 9.946178178993115,
                        "z0": 5.316620821751548,
                        "y0": 50.00418555142748,
                        "aX": -16.16389894652002,
                        "aY": 25.62931368334841,
                        "x": 106.6,
                        "x0": -2.414050692637437,
                        "aZ": -23.040925194522494,
                        "y": 185.06
                      },
                      "strikeZoneTop": 3.42,
                      "strikeZoneBottom": 1.56
                    },
                    "isPitch": true,
                    "pitchNumber": 2,
                    "count": {
                      "outs": 1,
                      "balls": 0,
                      "strikes": 1
                    },
                    "index": 2,
                    "details": {
                      "call": {
                        "code": "E",
                        "description": "In play, run(s)"
                      },
                      "ballColor": "rgba(26, 86, 190, 1.0)",
                      "code": "E",
                      "description": "In play, run(s)",
                      "isBall": false,
                      "isOut": false,
                      "type": {
                        "code": "CH",
                        "description": "Changeup"
                      },
                      "trailColor": "rgba(0, 85, 254, 1.0)",
                      "hasReview": false,
                      "isInPlay": true,
                      "isStrike": false
                    },
                    "hitData": {
                      "hardness": "medium",
                      "coordinates": {
                        "coordX": 187.72,
                        "coordY": 139.05
                      },
                      "launchSpeed": 74.5,
                      "location": "4",
                      "totalDistance": 215,
                      "trajectory": "popup",
                      "launchAngle": 52
                    },
                    "startTime": "2023-09-22T02:02:40.623Z",
                    "endTime": "2023-09-22T02:03:17.352Z",
                    "type": "pitch"
                  }
                ],
                "matchup": {
                  "splits": {
                    "batter": "vs_RHP",
                    "menOnBase": "Loaded",
                    "pitcher": "vs_LHB"
                  },
                  "batter": {
                    "link": "/api/v1/people/666310",
                    "fullName": "Bo Naylor",
                    "id": 666310
                  },
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "postOnThird": {
                    "link": "/api/v1/people/657656",
                    "fullName": "Ramon Laureano",
                    "id": 657656
                  },
                  "batterHotColdZones": [],
                  "postOnFirst": {
                    "link": "/api/v1/people/666310",
                    "fullName": "Bo Naylor",
                    "id": 666310
                  },
                  "pitcher": {
                    "link": "/api/v1/people/657097",
                    "fullName": "Jacob Webb",
                    "id": 657097
                  },
                  "pitcherHotColdZones": [],
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  },
                  "postOnSecond": {
                    "link": "/api/v1/people/664702",
                    "fullName": "Myles Straw",
                    "id": 664702
                  }
                }
              }
            ],
            "currentPlay": {
              "result": {
                "homeScore": 5,
                "awayScore": 2,
                "rbi": 0,
                "isOut": false,
                "type": "atBat"
              },
              "actionIndex": [
                0,
                1,
                2,
                3
              ],
              "runnerIndex": [],
              "pitchIndex": [
                4,
                5,
                6,
                8
              ],
              "playEndTime": "2023-09-22T02:15:37.414Z",
              "about": {
                "hasOut": false,
                "captivatingIndex": 0,
                "inning": 9,
                "isScoringPlay": false,
                "atBatIndex": 70,
                "startTime": "2023-09-22T02:14:36.863Z",
                "isTopInning": true,
                "endTime": "2023-09-22T02:15:37.414Z",
                "halfInning": "top",
                "isComplete": false
              },
              "count": {
                "outs": 0,
                "balls": 2,
                "strikes": 2
              },
              "atBatIndex": 70,
              "runners": [],
              "playEvents": [
                {
                  "isPitch": false,
                  "battingOrder": "401",
                  "count": {
                    "outs": 0,
                    "balls": 0,
                    "strikes": 0
                  },
                  "index": 0,
                  "details": {
                    "homeScore": 5,
                    "awayScore": 2,
                    "isScoringPlay": false,
                    "description": "Tyler Freeman remains in the game as the designated hitter.",
                    "isOut": false,
                    "eventType": "defensive_switch",
                    "event": "Defensive Switch",
                    "hasReview": false
                  },
                  "startTime": "2023-09-22T02:13:26.383Z",
                  "endTime": "2023-09-22T02:13:26.437Z",
                  "isSubstitution": true,
                  "position": {
                    "code": "10",
                    "name": "Designated Hitter",
                    "type": "Hitter",
                    "abbreviation": "DH"
                  },
                  "type": "action",
                  "replacedPlayer": {
                    "link": "/api/v1/people/594777",
                    "id": 594777
                  },
                  "player": {
                    "link": "/api/v1/people/671289",
                    "id": 671289
                  }
                },
                {
                  "isPitch": false,
                  "battingOrder": "600",
                  "count": {
                    "outs": 0,
                    "balls": 0,
                    "strikes": 0
                  },
                  "index": 1,
                  "details": {
                    "homeScore": 5,
                    "awayScore": 2,
                    "isScoringPlay": false,
                    "description": "Defensive switch from center field to right field for Ramon Laureano.",
                    "isOut": false,
                    "eventType": "defensive_switch",
                    "event": "Defensive Switch",
                    "hasReview": false
                  },
                  "startTime": "2023-09-22T02:13:26.437Z",
                  "endTime": "2023-09-22T02:13:26.439Z",
                  "isSubstitution": true,
                  "position": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "type": "action",
                  "player": {
                    "link": "/api/v1/people/657656",
                    "id": 657656
                  }
                },
                {
                  "isPitch": false,
                  "battingOrder": "701",
                  "count": {
                    "outs": 0,
                    "balls": 0,
                    "strikes": 0
                  },
                  "index": 2,
                  "details": {
                    "homeScore": 5,
                    "awayScore": 2,
                    "isScoringPlay": false,
                    "description": "Myles Straw remains in the game as the center fielder.",
                    "isOut": false,
                    "eventType": "defensive_switch",
                    "event": "Defensive Switch",
                    "hasReview": false
                  },
                  "startTime": "2023-09-22T02:13:26.439Z",
                  "endTime": "2023-09-22T02:13:26.443Z",
                  "isSubstitution": true,
                  "position": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "type": "action",
                  "replacedPlayer": {
                    "link": "/api/v1/people/686823",
                    "id": 686823
                  },
                  "player": {
                    "link": "/api/v1/people/664702",
                    "id": 664702
                  }
                },
                {
                  "isPitch": false,
                  "count": {
                    "outs": 0,
                    "balls": 0,
                    "strikes": 0
                  },
                  "index": 3,
                  "details": {
                    "homeScore": 5,
                    "awayScore": 2,
                    "isScoringPlay": false,
                    "description": "Pitching Change: Emmanuel Clase replaces Trevor Stephan.",
                    "isOut": false,
                    "eventType": "pitching_substitution",
                    "event": "Pitching Substitution",
                    "hasReview": false
                  },
                  "startTime": "2023-09-22T02:13:26.443Z",
                  "endTime": "2023-09-22T02:14:39.863Z",
                  "isSubstitution": true,
                  "position": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "type": "action",
                  "player": {
                    "link": "/api/v1/people/661403",
                    "id": 661403
                  }
                },
                {
                  "playId": "e2bedf14-e671-45d6-b961-5318653e0ace",
                  "pitchData": {
                    "endSpeed": 90.5,
                    "extension": 6.552357016621962,
                    "breaks": {
                      "spinRate": 2649,
                      "breakHorizontal": -3.7,
                      "breakAngle": 6,
                      "breakVertical": -17,
                      "breakVerticalInduced": 11,
                      "spinDirection": 169
                    },
                    "startSpeed": 98.6,
                    "zone": 11,
                    "plateTime": 0.380661763495429,
                    "coordinates": {
                      "pfxX": 2.1381474394589386,
                      "pX": -0.2517929034157176,
                      "pZ": 3.6085952015228844,
                      "pfxZ": 6.317357813318418,
                      "vY0": -143.67509650560584,
                      "vZ0": -3.332682755608729,
                      "vX0": -0.5366102857210243,
                      "z0": 5.953540398804762,
                      "y0": 50.00387152910718,
                      "aX": 4.487546052729909,
                      "aY": 32.07825603767276,
                      "x": 126.6,
                      "x0": -0.3408882393145306,
                      "aZ": -18.916302355462882,
                      "y": 141.35
                    },
                    "strikeZoneTop": 3.21,
                    "strikeZoneBottom": 1.46
                  },
                  "isPitch": true,
                  "pitchNumber": 1,
                  "count": {
                    "outs": 0,
                    "balls": 1,
                    "strikes": 0
                  },
                  "index": 4,
                  "details": {
                    "call": {
                      "code": "B",
                      "description": "Ball"
                    },
                    "ballColor": "rgba(39, 161, 39, 1.0)",
                    "code": "B",
                    "description": "Ball",
                    "isBall": true,
                    "isOut": false,
                    "type": {
                      "code": "FC",
                      "description": "Cutter"
                    },
                    "trailColor": "rgba(152, 0, 101, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": false
                  },
                  "startTime": "2023-09-22T02:14:39.863Z",
                  "endTime": "2023-09-22T02:14:54.172Z",
                  "type": "pitch"
                },
                {
                  "playId": "1db8eaf9-f985-43d3-8660-ff6fef2ae78d",
                  "pitchData": {
                    "endSpeed": 90.2,
                    "extension": 6.615318103145827,
                    "breaks": {
                      "spinRate": 2641,
                      "breakHorizontal": -2,
                      "breakAngle": 12,
                      "breakVertical": -19.3,
                      "breakVerticalInduced": 9,
                      "spinDirection": 172
                    },
                    "startSpeed": 97.9,
                    "zone": 2,
                    "plateTime": 0.38316344542978964,
                    "coordinates": {
                      "pfxX": 0.9962146196807955,
                      "pX": 0.22306368345127048,
                      "pZ": 2.7531580574864716,
                      "pfxZ": 5.391413671305282,
                      "vY0": -142.561048524892,
                      "vZ0": -5.037461398663866,
                      "vX0": 1.5020812206458303,
                      "z0": 5.855111869942289,
                      "y0": 50.00061691392374,
                      "aX": 2.064478008201807,
                      "aY": 30.590205437910164,
                      "x": 108.5,
                      "x0": -0.43861428743111663,
                      "aZ": -20.993950457518075,
                      "y": 164.44
                    },
                    "strikeZoneTop": 3.21,
                    "strikeZoneBottom": 1.46
                  },
                  "isPitch": true,
                  "pitchNumber": 2,
                  "count": {
                    "outs": 0,
                    "balls": 1,
                    "strikes": 1
                  },
                  "index": 5,
                  "details": {
                    "call": {
                      "code": "C",
                      "description": "Called Strike"
                    },
                    "ballColor": "rgba(170, 21, 11, 1.0)",
                    "code": "C",
                    "description": "Called Strike",
                    "isBall": false,
                    "isOut": false,
                    "type": {
                      "code": "FC",
                      "description": "Cutter"
                    },
                    "trailColor": "rgba(152, 0, 101, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": true
                  },
                  "startTime": "2023-09-22T02:14:54.172Z",
                  "endTime": "2023-09-22T02:15:08.821Z",
                  "type": "pitch"
                },
                {
                  "playId": "6bba92d3-b888-4386-bac7-80a03e26ac55",
                  "pitchData": {
                    "endSpeed": 81.6,
                    "extension": 6.689533028667978,
                    "breaks": {
                      "spinRate": 2689,
                      "breakHorizontal": -10.4,
                      "breakAngle": 25.2,
                      "breakVertical": -30.4,
                      "breakVerticalInduced": 4.4,
                      "spinDirection": 66
                    },
                    "startSpeed": 88.6,
                    "zone": 14,
                    "plateTime": 0.4248429959180915,
                    "coordinates": {
                      "pfxX": 5.717813344757148,
                      "pX": 0.4146621717005251,
                      "pZ": 1.139344194255813,
                      "pfxZ": 3.1550435429766672,
                      "vY0": -128.90750849810755,
                      "vZ0": -6.575513544214475,
                      "vX0": 0.5382886384102848,
                      "z0": 5.79557271696149,
                      "y0": 50.00052456346015,
                      "aX": 9.623640970354469,
                      "aY": 26.71384005279181,
                      "x": 101.19,
                      "x0": -0.5395884958888795,
                      "aZ": -26.855822274058873,
                      "y": 208.02
                    },
                    "strikeZoneTop": 3.21,
                    "strikeZoneBottom": 1.46
                  },
                  "isPitch": true,
                  "pitchNumber": 3,
                  "count": {
                    "outs": 0,
                    "balls": 1,
                    "strikes": 2
                  },
                  "index": 6,
                  "details": {
                    "call": {
                      "code": "S",
                      "description": "Swinging Strike"
                    },
                    "ballColor": "rgba(170, 21, 11, 1.0)",
                    "code": "S",
                    "description": "Swinging Strike",
                    "isBall": false,
                    "isOut": false,
                    "type": {
                      "code": "SL",
                      "description": "Slider"
                    },
                    "trailColor": "rgba(0, 0, 254, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": true
                  },
                  "startTime": "2023-09-22T02:15:08.821Z",
                  "endTime": "2023-09-22T02:15:20.932Z",
                  "type": "pitch"
                },
                {
                  "isPitch": false,
                  "count": {
                    "outs": 0,
                    "balls": 1,
                    "strikes": 2
                  },
                  "index": 7,
                  "details": {
                    "homeScore": 5,
                    "awayScore": 2,
                    "isScoringPlay": false,
                    "description": "Batter Timeout.",
                    "isOut": false,
                    "eventType": "batter_timeout",
                    "event": "Batter Timeout",
                    "hasReview": false
                  },
                  "startTime": "2023-09-22T02:15:20.932Z",
                  "endTime": "2023-09-22T02:15:37.414Z",
                  "type": "action",
                  "player": {
                    "link": "/api/v1/people/669720",
                    "id": 669720
                  }
                },
                {
                  "playId": "e6338681-5e6b-4cbe-9ecb-f51d0882270e",
                  "pitchData": {
                    "endSpeed": 84.2,
                    "breaks": {
                      "spinRate": 2693,
                      "breakHorizontal": -8.3,
                      "breakAngle": 32.4,
                      "breakVertical": -33.8,
                      "breakVerticalInduced": -1,
                      "spinDirection": 62
                    },
                    "startSpeed": 91.1,
                    "zone": 14,
                    "plateTime": 0.4130835919959721,
                    "coordinates": {
                      "pfxX": 4.252726283881759,
                      "pX": 1.3810579496544821,
                      "pZ": 0.74932360891144,
                      "pfxZ": 0.21600142883893403,
                      "vY0": -132.56451528400657,
                      "vZ0": -7.112632520612162,
                      "vX0": 2.888660059912065,
                      "z0": 5.786137074838649,
                      "y0": 50.00323819432226,
                      "aX": 7.572778958447824,
                      "aY": 28.191120513650393,
                      "x": 64.36,
                      "x0": -0.2750588373195438,
                      "aZ": -31.789666266414592,
                      "y": 218.55
                    },
                    "strikeZoneTop": 3.21,
                    "strikeZoneBottom": 1.46
                  },
                  "isPitch": true,
                  "pitchNumber": 4,
                  "count": {
                    "outs": 0,
                    "balls": 2,
                    "strikes": 2
                  },
                  "index": 8,
                  "details": {
                    "call": {
                      "code": "B",
                      "description": "Ball"
                    },
                    "ballColor": "rgba(39, 161, 39, 1.0)",
                    "code": "B",
                    "description": "Ball",
                    "isBall": true,
                    "isOut": false,
                    "type": {
                      "code": "SL",
                      "description": "Slider"
                    },
                    "trailColor": "rgba(0, 0, 254, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": false
                  },
                  "startTime": "2023-09-22T02:15:37.414Z",
                  "endTime": "2023-09-22T02:15:37.414Z",
                  "type": "pitch"
                }
              ],
              "matchup": {
                "splits": {
                  "batter": "vs_RHP",
                  "menOnBase": "Empty",
                  "pitcher": "vs_RHB"
                },
                "batter": {
                  "link": "/api/v1/people/669720",
                  "fullName": "Austin Hays",
                  "id": 669720
                },
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "batterHotColdZones": [
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "01",
                    "value": ".935"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "02",
                    "value": ".769"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "03",
                    "value": ".722"
                  },
                  {
                    "temp": "hot",
                    "color": "rgba(214, 41, 52, .55)",
                    "zone": "04",
                    "value": "1.196"
                  },
                  {
                    "temp": "warm",
                    "color": "rgba(234, 147, 153, .55)",
                    "zone": "05",
                    "value": ".952"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "06",
                    "value": ".407"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "07",
                    "value": ".714"
                  },
                  {
                    "temp": "warm",
                    "color": "rgba(234, 147, 153, .55)",
                    "zone": "08",
                    "value": "1.023"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "09",
                    "value": ".651"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "11",
                    "value": ".678"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "12",
                    "value": ".774"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "13",
                    "value": ".349"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "14",
                    "value": ".415"
                  }
                ],
                "batterHotColdZoneStats": {
                  "stats": [
                    {
                      "splits": [
                        {
                          "stat": {
                            "name": "onBasePlusSlugging",
                            "zones": [
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "01",
                                "value": ".935"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "02",
                                "value": ".769"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "03",
                                "value": ".722"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "04",
                                "value": "1.196"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "05",
                                "value": ".952"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "06",
                                "value": ".407"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "07",
                                "value": ".714"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "08",
                                "value": "1.023"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "09",
                                "value": ".651"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "11",
                                "value": ".678"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "12",
                                "value": ".774"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "13",
                                "value": ".349"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "14",
                                "value": ".415"
                              }
                            ]
                          }
                        },
                        {
                          "stat": {
                            "name": "battingAverage",
                            "zones": [
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "01",
                                "value": ".345"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "02",
                                "value": ".289"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "03",
                                "value": ".278"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "04",
                                "value": ".463"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "05",
                                "value": ".344"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "06",
                                "value": ".167"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "07",
                                "value": ".286"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "08",
                                "value": ".349"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "09",
                                "value": ".302"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "11",
                                "value": ".250"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "12",
                                "value": ".280"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "13",
                                "value": ".033"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "14",
                                "value": ".121"
                              }
                            ]
                          }
                        },
                        {
                          "stat": {
                            "name": "exitVelocity",
                            "zones": [
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "01",
                                "value": "90.04"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "02",
                                "value": "94.45"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "03",
                                "value": "90.85"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "04",
                                "value": "93.61"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "05",
                                "value": "96.23"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "06",
                                "value": "89.43"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "07",
                                "value": "91.79"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "08",
                                "value": "90.72"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "09",
                                "value": "81.56"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "11",
                                "value": "80.10"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "12",
                                "value": "82.77"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "13",
                                "value": "82.06"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "14",
                                "value": "77.15"
                              }
                            ]
                          }
                        }
                      ],
                      "exemptions": [],
                      "type": {
                        "displayName": "hotColdZones"
                      },
                      "group": {
                        "displayName": "hitting"
                      }
                    }
                  ]
                },
                "pitcher": {
                  "link": "/api/v1/people/661403",
                  "fullName": "Emmanuel Clase",
                  "id": 661403
                },
                "pitcherHotColdZones": [],
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              }
            }
          }
        ],
        "startTime": "2023-09-21T23:15:00Z",
        "lastUpdate": "2023-09-22T02:16:01.760Z",
        "awayTeamLogoSlug": "baltimore-orioles",
        "homeTeamLogoSlug": "cleveland-guardians",
        "gameStarted": "true",
        "gameEnded": "false",
        "liveGameID": null,
        "livegame": null,
        "liveGameData": "[{}]",
        "currentHalfInning": "Top 9",
        "lastEvent": "Ball"
      },
      {
        "__typename": "SportsGame",
        "id": "716508",
        "sport": "baseball",
        "homeTeam": "Houston Astros",
        "awayTeam": "Baltimore Orioles",
        "gameStatus": "Final",
        "homeTeamWins": "85",
        "homeTeamLosses": "68",
        "awayTeamWins": "95",
        "awayTeamLosses": "57",
        "initialGameInfo": [
          {
            "finalData": {
              "winner": {
                "link": "/api/v1/people/519151",
                "fullName": "Ryan Pressly",
                "id": 519151
              },
              "loser": {
                "link": "/api/v1/people/543056",
                "fullName": "Danny Coulombe",
                "id": 543056
              }
            },
            "initialGameData": {
              "venue": {
                "name": "Minute Maid Park",
                "link": "/api/v1/venues/2392",
                "timeZone": {
                  "offset": -5,
                  "tz": "CDT",
                  "offsetAtGameTime": -5,
                  "id": "America/Chicago"
                },
                "active": true,
                "season": "2023",
                "location": {
                  "elevation": 45,
                  "country": "USA",
                  "city": "Houston",
                  "phone": "(713) 259-8000",
                  "address1": "501 Crawford Street",
                  "postalCode": "77002",
                  "defaultCoordinates": {
                    "latitude": 29.756967,
                    "longitude": -95.355509
                  },
                  "state": "Texas",
                  "azimuthAngle": 343,
                  "stateAbbrev": "TX"
                },
                "id": 2392,
                "fieldInfo": {
                  "turfType": "Grass",
                  "leftCenter": 362,
                  "leftLine": 315,
                  "rightCenter": 373,
                  "rightLine": 326,
                  "roofType": "Retractable",
                  "center": 409,
                  "capacity": 41000
                }
              },
              "game": {
                "doubleHeader": "N",
                "calendarEventID": "14-716508-2023-09-20",
                "gameNumber": 1,
                "season": "2023",
                "pk": 716508,
                "id": "2023/09/20/balmlb-houmlb-1",
                "tiebreaker": "N",
                "type": "R",
                "gamedayType": "P",
                "seasonDisplay": "2023"
              },
              "officialScorer": {
                "link": "/api/v1/people/431016",
                "fullName": "Rick Blount",
                "id": 431016
              },
              "teams": {
                "away": {
                  "teamName": "Orioles",
                  "venue": {
                    "name": "Oriole Park at Camden Yards",
                    "link": "/api/v1/venues/2",
                    "id": 2
                  },
                  "locationName": "Baltimore",
                  "firstYearOfPlay": "1901",
                  "league": {
                    "name": "American League",
                    "link": "/api/v1/league/103",
                    "id": 103
                  },
                  "clubName": "Orioles",
                  "link": "/api/v1/teams/110",
                  "teamCode": "bal",
                  "fileCode": "bal",
                  "active": true,
                  "allStarStatus": "N",
                  "springVenue": {
                    "link": "/api/v1/venues/2508",
                    "id": 2508
                  },
                  "abbreviation": "BAL",
                  "springLeague": {
                    "name": "Grapefruit League",
                    "link": "/api/v1/league/115",
                    "id": 115,
                    "abbreviation": "GL"
                  },
                  "division": {
                    "name": "American League East",
                    "link": "/api/v1/divisions/201",
                    "id": 201
                  },
                  "record": {
                    "divisionGamesBack": "-",
                    "wins": 95,
                    "conferenceGamesBack": "-",
                    "records": {},
                    "springLeagueGamesBack": "-",
                    "leagueGamesBack": "-",
                    "divisionLeader": false,
                    "losses": 57,
                    "wildCardGamesBack": "-",
                    "sportGamesBack": "-",
                    "leagueRecord": {
                      "wins": 95,
                      "pct": ".625",
                      "ties": 0,
                      "losses": 57
                    },
                    "gamesPlayed": 152,
                    "winningPercentage": ".625"
                  },
                  "name": "Baltimore Orioles",
                  "season": 2023,
                  "id": 110,
                  "shortName": "Baltimore",
                  "sport": {
                    "link": "/api/v1/sports/1",
                    "name": "Major League Baseball",
                    "id": 1
                  },
                  "franchiseName": "Baltimore"
                },
                "home": {
                  "teamName": "Astros",
                  "venue": {
                    "name": "Minute Maid Park",
                    "link": "/api/v1/venues/2392",
                    "id": 2392
                  },
                  "locationName": "Houston",
                  "firstYearOfPlay": "1962",
                  "league": {
                    "name": "American League",
                    "link": "/api/v1/league/103",
                    "id": 103
                  },
                  "clubName": "Astros",
                  "link": "/api/v1/teams/117",
                  "teamCode": "hou",
                  "fileCode": "hou",
                  "active": true,
                  "allStarStatus": "N",
                  "springVenue": {
                    "link": "/api/v1/venues/5000",
                    "id": 5000
                  },
                  "abbreviation": "HOU",
                  "springLeague": {
                    "name": "Grapefruit League",
                    "link": "/api/v1/league/115",
                    "id": 115,
                    "abbreviation": "GL"
                  },
                  "division": {
                    "name": "American League West",
                    "link": "/api/v1/divisions/200",
                    "id": 200
                  },
                  "record": {
                    "divisionGamesBack": "-",
                    "wins": 85,
                    "conferenceGamesBack": "-",
                    "records": {},
                    "springLeagueGamesBack": "-",
                    "leagueGamesBack": "-",
                    "divisionLeader": false,
                    "losses": 68,
                    "wildCardGamesBack": "-",
                    "sportGamesBack": "-",
                    "leagueRecord": {
                      "wins": 85,
                      "pct": ".556",
                      "ties": 0,
                      "losses": 68
                    },
                    "gamesPlayed": 153,
                    "winningPercentage": ".556"
                  },
                  "name": "Houston Astros",
                  "season": 2023,
                  "id": 117,
                  "shortName": "Houston",
                  "sport": {
                    "link": "/api/v1/sports/1",
                    "name": "Major League Baseball",
                    "id": 1
                  },
                  "franchiseName": "Houston"
                }
              },
              "players": {
                "ID624428": {
                  "isPlayer": true,
                  "lastInitName": "Frazier, A",
                  "lastName": "Frazier",
                  "birthStateProvince": "GA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2016-06-24",
                  "link": "/api/v1/people/624428",
                  "nameFirstLast": "Adam Frazier",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 31,
                  "firstLastName": "Adam Frazier",
                  "lastFirstName": "Frazier, Adam",
                  "birthCountry": "USA",
                  "useName": "Adam",
                  "id": 624428,
                  "fullFMLName": "Adam Timothy Frazier",
                  "height": "5' 10\"",
                  "nameSlug": "adam-frazier-624428",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Fraz",
                  "draftYear": 2013,
                  "boxscoreName": "Frazier",
                  "fullName": "Adam Frazier",
                  "weight": 180,
                  "active": true,
                  "birthCity": "Athens",
                  "initLastName": "A Frazier",
                  "strikeZoneTop": 3.18,
                  "birthDate": "1991-12-14",
                  "primaryNumber": "12",
                  "firstName": "Adam",
                  "fullLFMName": "Frazier, Adam Timothy",
                  "useLastName": "Frazier",
                  "middleName": "Timothy",
                  "strikeZoneBottom": 1.45,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID664285": {
                  "isPlayer": true,
                  "lastInitName": "Valdez, F",
                  "lastName": "Valdez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-08-21",
                  "link": "/api/v1/people/664285",
                  "nameFirstLast": "Framber Valdez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Framber Valdez",
                  "lastFirstName": "Valdez, Framber",
                  "birthCountry": "Dominican Republic",
                  "useName": "Framber",
                  "id": 664285,
                  "fullFMLName": "Framber Valdez",
                  "height": "5' 11\"",
                  "nameMatrilineal": "Pinales",
                  "nameSlug": "framber-valdez-664285",
                  "pronunciation": "FRAHM-burr",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "boxscoreName": "Valdez, F",
                  "fullName": "Framber Valdez",
                  "weight": 239,
                  "active": true,
                  "birthCity": "Palenque",
                  "initLastName": "F Valdez",
                  "strikeZoneTop": 3.319,
                  "birthDate": "1993-11-19",
                  "primaryNumber": "59",
                  "firstName": "Framber",
                  "fullLFMName": "Valdez, Framber",
                  "useLastName": "Valdez",
                  "strikeZoneBottom": 1.513,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID455117": {
                  "isPlayer": true,
                  "lastInitName": "Maldonado, M",
                  "lastName": "Maldonado",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2011-09-03",
                  "link": "/api/v1/people/455117",
                  "nameFirstLast": "Martin Maldonado",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 37,
                  "firstLastName": "Martín Maldonado",
                  "lastFirstName": "Maldonado, Martín",
                  "birthCountry": "Puerto Rico",
                  "useName": "Martin",
                  "id": 455117,
                  "fullFMLName": "Martín Maldonado",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Valdes",
                  "nameSlug": "martin-maldonado-455117",
                  "pronunciation": "Mar-TEEN",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Martincito",
                  "draftYear": 2004,
                  "boxscoreName": "Maldonado, M",
                  "fullName": "Martin Maldonado",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Naguabo",
                  "initLastName": "M Maldonado",
                  "strikeZoneTop": 3.13,
                  "birthDate": "1986-08-16",
                  "primaryNumber": "15",
                  "firstName": "Martin",
                  "fullLFMName": "Maldonado, Martín",
                  "useLastName": "Maldonado",
                  "strikeZoneBottom": 1.43,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID650556": {
                  "isPlayer": true,
                  "lastInitName": "Abreu, B",
                  "lastName": "Abreu",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-07-31",
                  "link": "/api/v1/people/650556",
                  "nameFirstLast": "Bryan Abreu",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 26,
                  "firstLastName": "Bryan Abreu",
                  "lastFirstName": "Abreu, Bryan",
                  "birthCountry": "Dominican Republic",
                  "useName": "Bryan",
                  "id": 650556,
                  "fullFMLName": "Bryan Enrique Abreu",
                  "height": "6' 1\"",
                  "nameMatrilineal": "Jimenez",
                  "nameSlug": "bryan-abreu-650556",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Abreu, B",
                  "fullName": "Bryan Abreu",
                  "weight": 225,
                  "active": true,
                  "birthCity": "Santo Domingo Centro",
                  "initLastName": "B Abreu",
                  "strikeZoneTop": 3.411,
                  "birthDate": "1997-04-22",
                  "primaryNumber": "52",
                  "firstName": "Bryan",
                  "fullLFMName": "Abreu, Bryan Enrique",
                  "useLastName": "Abreu",
                  "middleName": "Enrique",
                  "strikeZoneBottom": 1.565,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID657508": {
                  "isPlayer": true,
                  "lastInitName": "Baumann, M",
                  "lastName": "Baumann",
                  "birthStateProvince": "MN",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2021-09-07",
                  "link": "/api/v1/people/657508",
                  "nameFirstLast": "Mike Baumann",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "Mike Baumann",
                  "lastFirstName": "Baumann, Mike",
                  "birthCountry": "USA",
                  "useName": "Mike",
                  "id": 657508,
                  "fullFMLName": "Michael Thomas Baumann",
                  "height": "6' 4\"",
                  "nameSlug": "mike-baumann-657508",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Baumann",
                  "fullName": "Mike Baumann",
                  "weight": 240,
                  "active": true,
                  "birthCity": "Mahtomedi",
                  "initLastName": "M Baumann",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1995-09-10",
                  "primaryNumber": "53",
                  "firstName": "Michael",
                  "fullLFMName": "Baumann, Michael Thomas",
                  "useLastName": "Baumann",
                  "middleName": "Thomas",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID606160": {
                  "isPlayer": true,
                  "lastInitName": "Montero, R",
                  "lastName": "Montero",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-05-14",
                  "link": "/api/v1/people/606160",
                  "nameFirstLast": "Rafael Montero",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 32,
                  "firstLastName": "Rafael Montero",
                  "lastFirstName": "Montero, Rafael",
                  "birthCountry": "Dominican Republic",
                  "useName": "Rafael",
                  "id": 606160,
                  "fullFMLName": "Rafael Montero",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Quezada",
                  "nameSlug": "rafael-montero-606160",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Monte",
                  "boxscoreName": "Montero",
                  "fullName": "Rafael Montero",
                  "weight": 190,
                  "active": true,
                  "birthCity": "Higuerito",
                  "initLastName": "R Montero",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1990-10-17",
                  "primaryNumber": "47",
                  "firstName": "Rafael",
                  "fullLFMName": "Montero, Rafael",
                  "useLastName": "Montero",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID622761": {
                  "isPlayer": true,
                  "lastInitName": "Mateo, J",
                  "lastName": "Mateo",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2020-08-13",
                  "link": "/api/v1/people/622761",
                  "nameFirstLast": "Jorge Mateo",
                  "primaryPosition": {
                    "code": "6",
                    "name": "Shortstop",
                    "type": "Infielder",
                    "abbreviation": "SS"
                  },
                  "currentAge": 28,
                  "firstLastName": "Jorge Mateo",
                  "lastFirstName": "Mateo, Jorge",
                  "birthCountry": "Dominican Republic",
                  "useName": "Jorge",
                  "id": 622761,
                  "fullFMLName": "Jorge Luis Mateo",
                  "height": "6' 1\"",
                  "nameSlug": "jorge-mateo-622761",
                  "pronunciation": "ma-TAY-oh",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Mateo",
                  "fullName": "Jorge Mateo",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Santo Domingo Oeste",
                  "initLastName": "J Mateo",
                  "strikeZoneTop": 3.38,
                  "birthDate": "1995-06-23",
                  "primaryNumber": "3",
                  "firstName": "Jorge",
                  "fullLFMName": "Mateo, Jorge Luis",
                  "useLastName": "Mateo",
                  "middleName": "Luis",
                  "strikeZoneBottom": 1.62,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID683002": {
                  "isPlayer": true,
                  "lastInitName": "Henderson, G",
                  "lastName": "Henderson",
                  "birthStateProvince": "AL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-08-31",
                  "link": "/api/v1/people/683002",
                  "nameFirstLast": "Gunnar Henderson",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 22,
                  "firstLastName": "Gunnar Henderson",
                  "lastFirstName": "Henderson, Gunnar",
                  "birthCountry": "USA",
                  "useName": "Gunnar",
                  "id": 683002,
                  "fullFMLName": "Gunnar Randal Henderson",
                  "height": "6' 3\"",
                  "nameSlug": "gunnar-henderson-683002",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Henderson",
                  "fullName": "Gunnar Henderson",
                  "weight": 220,
                  "active": true,
                  "birthCity": "Montgomery",
                  "initLastName": "G Henderson",
                  "strikeZoneTop": 3.69,
                  "birthDate": "2001-06-29",
                  "primaryNumber": "2",
                  "firstName": "Gunnar",
                  "fullLFMName": "Henderson, Gunnar Randal",
                  "useLastName": "Henderson",
                  "middleName": "Randal",
                  "strikeZoneBottom": 1.73,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID572138": {
                  "isPlayer": true,
                  "lastInitName": "Singleton, J",
                  "lastName": "Singleton",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-06-03",
                  "link": "/api/v1/people/572138",
                  "nameFirstLast": "Jon Singleton",
                  "primaryPosition": {
                    "code": "3",
                    "name": "First Base",
                    "type": "Infielder",
                    "abbreviation": "1B"
                  },
                  "currentAge": 32,
                  "firstLastName": "Jon Singleton",
                  "lastFirstName": "Singleton, Jon",
                  "birthCountry": "USA",
                  "useName": "Jon",
                  "id": 572138,
                  "fullFMLName": "Jonathan L. Singleton",
                  "height": "6' 0\"",
                  "nameSlug": "jon-singleton-572138",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2009,
                  "boxscoreName": "Singleton",
                  "fullName": "Jon Singleton",
                  "weight": 256,
                  "active": true,
                  "birthCity": "Harbor City",
                  "initLastName": "J Singleton",
                  "strikeZoneTop": 3.12,
                  "birthDate": "1991-09-18",
                  "primaryNumber": "28",
                  "firstName": "Jonathan",
                  "fullLFMName": "Singleton, Jonathan L.",
                  "useLastName": "Singleton",
                  "middleName": "L.",
                  "strikeZoneBottom": 1.48,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID663630": {
                  "isPlayer": true,
                  "lastInitName": "McKenna, R",
                  "lastName": "McKenna",
                  "birthStateProvince": "OR",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2021-04-05",
                  "link": "/api/v1/people/663630",
                  "nameFirstLast": "Ryan McKenna",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 26,
                  "firstLastName": "Ryan McKenna",
                  "lastFirstName": "McKenna, Ryan",
                  "birthCountry": "USA",
                  "useName": "Ryan",
                  "id": 663630,
                  "fullFMLName": "Ryan Shea McKenna",
                  "height": "5' 11\"",
                  "nameSlug": "ryan-mckenna-663630",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2015,
                  "boxscoreName": "McKenna",
                  "fullName": "Ryan McKenna",
                  "weight": 195,
                  "active": true,
                  "birthCity": "Grants Pass",
                  "initLastName": "R McKenna",
                  "strikeZoneTop": 3.4,
                  "birthDate": "1997-02-14",
                  "primaryNumber": "26",
                  "firstName": "Ryan",
                  "fullLFMName": "McKenna, Ryan Shea",
                  "useLastName": "McKenna",
                  "middleName": "Shea",
                  "strikeZoneBottom": 1.61,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID680694": {
                  "isPlayer": true,
                  "lastInitName": "Bradish, K",
                  "lastName": "Bradish",
                  "birthStateProvince": "AZ",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-04-29",
                  "link": "/api/v1/people/680694",
                  "nameFirstLast": "Kyle Bradish",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Kyle Bradish",
                  "lastFirstName": "Bradish, Kyle",
                  "birthCountry": "USA",
                  "useName": "Kyle",
                  "id": 680694,
                  "fullFMLName": "Kyle Edward Bradish",
                  "height": "6' 3\"",
                  "nameSlug": "kyle-bradish-680694",
                  "pronunciation": "BRAD-ish",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Bradish",
                  "fullName": "Kyle Bradish",
                  "weight": 215,
                  "active": true,
                  "birthCity": "Peoria",
                  "initLastName": "K Bradish",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1996-09-12",
                  "primaryNumber": "39",
                  "firstName": "Kyle",
                  "fullLFMName": "Bradish, Kyle Edward",
                  "useLastName": "Bradish",
                  "middleName": "Edward",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID608665": {
                  "isPlayer": true,
                  "lastInitName": "Graveman, K",
                  "lastName": "Graveman",
                  "birthStateProvince": "AL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-09-05",
                  "link": "/api/v1/people/608665",
                  "nameFirstLast": "Kendall Graveman",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 32,
                  "firstLastName": "Kendall Graveman",
                  "lastFirstName": "Graveman, Kendall",
                  "birthCountry": "USA",
                  "useName": "Kendall",
                  "id": 608665,
                  "fullFMLName": "Kendall Chase Graveman",
                  "height": "6' 2\"",
                  "nameSlug": "kendall-graveman-608665",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Digger",
                  "draftYear": 2013,
                  "boxscoreName": "Graveman",
                  "fullName": "Kendall Graveman",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Alexander City",
                  "initLastName": "K Graveman",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1990-12-21",
                  "primaryNumber": "31",
                  "firstName": "Kendall",
                  "fullLFMName": "Graveman, Kendall Chase",
                  "useLastName": "Graveman",
                  "middleName": "Chase",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID680570": {
                  "isPlayer": true,
                  "lastInitName": "Rodriguez, G",
                  "lastName": "Rodriguez",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-04-05",
                  "link": "/api/v1/people/680570",
                  "nameFirstLast": "Grayson Rodriguez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 23,
                  "firstLastName": "Grayson Rodriguez",
                  "lastFirstName": "Rodriguez, Grayson",
                  "birthCountry": "USA",
                  "useName": "Grayson",
                  "id": 680570,
                  "fullFMLName": "Grayson Greer Rodriguez",
                  "height": "6' 5\"",
                  "nameSlug": "grayson-rodriguez-680570",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Rodriguez, G",
                  "fullName": "Grayson Rodriguez",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Houston",
                  "initLastName": "G Rodriguez",
                  "strikeZoneTop": 3.575,
                  "birthDate": "1999-11-16",
                  "primaryNumber": "30",
                  "firstName": "Grayson",
                  "fullLFMName": "Rodriguez, Grayson Greer",
                  "useLastName": "Rodriguez",
                  "middleName": "Greer",
                  "strikeZoneBottom": 1.681,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID547989": {
                  "isPlayer": true,
                  "lastInitName": "Abreu, J",
                  "lastName": "Abreu",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-03-31",
                  "link": "/api/v1/people/547989",
                  "nameFirstLast": "Jose Abreu",
                  "primaryPosition": {
                    "code": "3",
                    "name": "First Base",
                    "type": "Infielder",
                    "abbreviation": "1B"
                  },
                  "currentAge": 36,
                  "firstLastName": "José Abreu",
                  "lastFirstName": "Abreu, José",
                  "birthCountry": "Cuba",
                  "useName": "Jose",
                  "id": 547989,
                  "fullFMLName": "José Dariel Abreu",
                  "height": "6' 3\"",
                  "nameMatrilineal": "Correa",
                  "nameSlug": "jose-abreu-547989",
                  "pronunciation": "uh-BRAY-you",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Mal Tiempo",
                  "boxscoreName": "Abreu, J",
                  "fullName": "Jose Abreu",
                  "weight": 235,
                  "active": true,
                  "birthCity": "Cienfuegos",
                  "initLastName": "J Abreu",
                  "strikeZoneTop": 3.35,
                  "birthDate": "1987-01-29",
                  "primaryNumber": "79",
                  "firstName": "Jose",
                  "fullLFMName": "Abreu, José Dariel",
                  "useLastName": "Abreu",
                  "middleName": "Dariel",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID677008": {
                  "isPlayer": true,
                  "lastInitName": "Kjerstad, H",
                  "lastName": "Kjerstad",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-09-14",
                  "link": "/api/v1/people/677008",
                  "nameFirstLast": "Heston Kjerstad",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 24,
                  "firstLastName": "Heston Kjerstad",
                  "lastFirstName": "Kjerstad, Heston",
                  "birthCountry": "USA",
                  "useName": "Heston",
                  "id": 677008,
                  "fullFMLName": "Heston Sawyer Kjerstad",
                  "height": "6' 3\"",
                  "nameSlug": "heston-kjerstad-677008",
                  "pronunciation": "kerr-stad",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2020,
                  "boxscoreName": "Kjerstad",
                  "fullName": "Heston Kjerstad",
                  "weight": 205,
                  "active": true,
                  "birthCity": "Amarillo",
                  "initLastName": "H Kjerstad",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1999-02-12",
                  "primaryNumber": "13",
                  "firstName": "Heston",
                  "fullLFMName": "Kjerstad, Heston Sawyer",
                  "useLastName": "Kjerstad",
                  "middleName": "Sawyer",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID656427": {
                  "isPlayer": true,
                  "lastInitName": "Flaherty, J",
                  "lastName": "Flaherty",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-09-01",
                  "link": "/api/v1/people/656427",
                  "nameFirstLast": "Jack Flaherty",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Jack Flaherty",
                  "lastFirstName": "Flaherty, Jack",
                  "birthCountry": "USA",
                  "useName": "Jack",
                  "id": 656427,
                  "fullFMLName": "Jack Rafe Flaherty",
                  "height": "6' 4\"",
                  "nameSlug": "jack-flaherty-656427",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Flare",
                  "draftYear": 2014,
                  "boxscoreName": "Flaherty",
                  "fullName": "Jack Flaherty",
                  "weight": 225,
                  "active": true,
                  "birthCity": "Burbank",
                  "initLastName": "J Flaherty",
                  "strikeZoneTop": 3.48,
                  "birthDate": "1995-10-15",
                  "primaryNumber": "15",
                  "firstName": "Jack",
                  "fullLFMName": "Flaherty, Jack Rafe",
                  "useLastName": "Flaherty",
                  "middleName": "Rafe",
                  "strikeZoneBottom": 1.62,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID543305": {
                  "isPlayer": true,
                  "lastInitName": "Hicks, A",
                  "lastName": "Hicks",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-04-01",
                  "link": "/api/v1/people/543305",
                  "nameFirstLast": "Aaron Hicks",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 33,
                  "firstLastName": "Aaron Hicks",
                  "lastFirstName": "Hicks, Aaron",
                  "birthCountry": "USA",
                  "useName": "Aaron",
                  "id": 543305,
                  "fullFMLName": "Aaron Michael Hicks",
                  "height": "6' 1\"",
                  "nameSlug": "aaron-hicks-543305",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Hicksie",
                  "draftYear": 2008,
                  "boxscoreName": "Hicks, A",
                  "fullName": "Aaron Hicks",
                  "weight": 205,
                  "active": true,
                  "birthCity": "San Pedro",
                  "initLastName": "A Hicks",
                  "strikeZoneTop": 3.63,
                  "birthDate": "1989-10-02",
                  "primaryNumber": "34",
                  "firstName": "Aaron",
                  "fullLFMName": "Hicks, Aaron Michael",
                  "useLastName": "Hicks",
                  "middleName": "Michael",
                  "strikeZoneBottom": 1.76,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID656986": {
                  "isPlayer": true,
                  "lastInitName": "Sousa, B",
                  "lastName": "Sousa",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-04-08",
                  "link": "/api/v1/people/656986",
                  "nameFirstLast": "Bennett Sousa",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "Bennett Sousa",
                  "lastFirstName": "Sousa, Bennett",
                  "birthCountry": "USA",
                  "useName": "Bennett",
                  "id": 656986,
                  "fullFMLName": "John Bennett Sousa",
                  "height": "6' 3\"",
                  "nameSlug": "bennett-sousa-656986",
                  "pronunciation": "SUE-zuh",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Sousa",
                  "fullName": "Bennett Sousa",
                  "weight": 220,
                  "active": true,
                  "birthCity": "North Palm Beach",
                  "initLastName": "B Sousa",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1995-04-06",
                  "primaryNumber": "62",
                  "firstName": "John",
                  "fullLFMName": "Sousa, John Bennett",
                  "useLastName": "Sousa",
                  "middleName": "Bennett",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID666197": {
                  "isPlayer": true,
                  "lastInitName": "Kessinger, G",
                  "lastName": "Kessinger",
                  "birthStateProvince": "MS",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2023-06-07",
                  "link": "/api/v1/people/666197",
                  "nameFirstLast": "Grae Kessinger",
                  "primaryPosition": {
                    "code": "6",
                    "name": "Shortstop",
                    "type": "Infielder",
                    "abbreviation": "SS"
                  },
                  "currentAge": 26,
                  "firstLastName": "Grae Kessinger",
                  "lastFirstName": "Kessinger, Grae",
                  "birthCountry": "USA",
                  "useName": "Grae",
                  "id": 666197,
                  "fullFMLName": "Graeber Crawley Kessinger",
                  "height": "6' 1\"",
                  "nameSlug": "grae-kessinger-666197",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Kessinger",
                  "fullName": "Grae Kessinger",
                  "weight": 204,
                  "active": true,
                  "birthCity": "Oxford",
                  "initLastName": "G Kessinger",
                  "strikeZoneTop": 3.26,
                  "birthDate": "1997-08-25",
                  "primaryNumber": "16",
                  "firstName": "Graeber",
                  "fullLFMName": "Kessinger, Graeber Crawley",
                  "useLastName": "Kessinger",
                  "middleName": "Crawley",
                  "strikeZoneBottom": 1.54,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID602104": {
                  "isPlayer": true,
                  "lastInitName": "Urías, R",
                  "lastName": "Urias",
                  "birthStateProvince": "SO",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2020-08-20",
                  "link": "/api/v1/people/602104",
                  "nameFirstLast": "Ramon Urias",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 29,
                  "firstLastName": "Ramón Urías",
                  "lastFirstName": "Urías, Ramón",
                  "birthCountry": "Mexico",
                  "useName": "Ramon",
                  "id": 602104,
                  "fullFMLName": "Ramón Francisco Urías",
                  "height": "5' 10\"",
                  "nameMatrilineal": "Figueroa",
                  "nameSlug": "ramon-urias-602104",
                  "pronunciation": "Uoo-REE-ahs",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Urías, R",
                  "fullName": "Ramon Urias",
                  "weight": 185,
                  "active": true,
                  "birthCity": "Magdalena de Kino",
                  "initLastName": "R Urías",
                  "strikeZoneTop": 3.13,
                  "birthDate": "1994-06-03",
                  "primaryNumber": "29",
                  "firstName": "Ramon",
                  "fullLFMName": "Urías, Ramón Francisco",
                  "useLastName": "Urías",
                  "middleName": "Francisco",
                  "strikeZoneBottom": 1.48,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID488726": {
                  "isPlayer": true,
                  "lastInitName": "Brantley, M",
                  "lastName": "Brantley",
                  "birthStateProvince": "WA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2009-09-01",
                  "link": "/api/v1/people/488726",
                  "nameFirstLast": "Michael Brantley",
                  "nameSuffix": "Jr.",
                  "primaryPosition": {
                    "code": "10",
                    "name": "Designated Hitter",
                    "type": "Hitter",
                    "abbreviation": "DH"
                  },
                  "currentAge": 36,
                  "firstLastName": "Michael Brantley",
                  "lastFirstName": "Brantley, Michael",
                  "birthCountry": "USA",
                  "useName": "Michael",
                  "id": 488726,
                  "fullFMLName": "Michael Charles Brantley",
                  "height": "6' 2\"",
                  "nameSlug": "michael-brantley-488726",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Champ",
                  "draftYear": 2005,
                  "nameTitle": "Jr.",
                  "boxscoreName": "Brantley",
                  "fullName": "Michael Brantley",
                  "weight": 209,
                  "active": true,
                  "birthCity": "Bellevue",
                  "initLastName": "M Brantley",
                  "strikeZoneTop": 3.22,
                  "birthDate": "1987-05-15",
                  "primaryNumber": "23",
                  "firstName": "Michael",
                  "fullLFMName": "Brantley, Michael Charles",
                  "useLastName": "Brantley",
                  "middleName": "Charles",
                  "strikeZoneBottom": 1.46,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID664299": {
                  "isPlayer": true,
                  "lastInitName": "Javier, C",
                  "lastName": "Javier",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2020-07-25",
                  "link": "/api/v1/people/664299",
                  "nameFirstLast": "Cristian Javier",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 26,
                  "firstLastName": "Cristian Javier",
                  "lastFirstName": "Javier, Cristian",
                  "birthCountry": "Dominican Republic",
                  "useName": "Cristian",
                  "id": 664299,
                  "fullFMLName": "Cristian Javier",
                  "height": "6' 1\"",
                  "nameMatrilineal": "Mieses",
                  "nameSlug": "cristian-javier-664299",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Javier",
                  "fullName": "Cristian Javier",
                  "weight": 213,
                  "active": true,
                  "birthCity": "Santo Domingo",
                  "initLastName": "C Javier",
                  "strikeZoneTop": 3.411,
                  "birthDate": "1997-03-26",
                  "primaryNumber": "53",
                  "firstName": "Cristian",
                  "fullLFMName": "Javier, Cristian",
                  "useLastName": "Javier",
                  "strikeZoneBottom": 1.565,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID519151": {
                  "isPlayer": true,
                  "lastInitName": "Pressly, R",
                  "lastName": "Pressly",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-04-04",
                  "link": "/api/v1/people/519151",
                  "nameFirstLast": "Ryan Pressly",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 34,
                  "firstLastName": "Ryan Pressly",
                  "lastFirstName": "Pressly, Ryan",
                  "birthCountry": "USA",
                  "useName": "Ryan",
                  "id": 519151,
                  "fullFMLName": "Thomas Ryan Pressly",
                  "height": "6' 2\"",
                  "nameSlug": "ryan-pressly-519151",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Press",
                  "draftYear": 2007,
                  "boxscoreName": "Pressly",
                  "fullName": "Ryan Pressly",
                  "weight": 206,
                  "active": true,
                  "birthCity": "Dallas",
                  "initLastName": "R Pressly",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1988-12-15",
                  "primaryNumber": "55",
                  "firstName": "Thomas",
                  "fullLFMName": "Pressly, Thomas Ryan",
                  "useLastName": "Pressly",
                  "middleName": "Ryan",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID664208": {
                  "isPlayer": true,
                  "lastInitName": "Maton, P",
                  "lastName": "Maton",
                  "birthStateProvince": "KY",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-06-11",
                  "link": "/api/v1/people/664208",
                  "nameFirstLast": "Phil Maton",
                  "nameSuffix": "III",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "Phil Maton",
                  "lastFirstName": "Maton, Phil",
                  "birthCountry": "USA",
                  "useName": "Phil",
                  "id": 664208,
                  "fullFMLName": "Phillip Louis Maton",
                  "height": "6' 2\"",
                  "nameSlug": "phil-maton-664208",
                  "pronunciation": "MAY-tahn",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Spin Rate",
                  "draftYear": 2015,
                  "nameTitle": "III",
                  "boxscoreName": "Maton, P",
                  "fullName": "Phil Maton",
                  "weight": 206,
                  "active": true,
                  "birthCity": "Paducah",
                  "initLastName": "P Maton",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1993-03-25",
                  "primaryNumber": "88",
                  "firstName": "Phillip",
                  "fullLFMName": "Maton, Phillip Louis",
                  "useLastName": "Maton",
                  "middleName": "Louis",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID543510": {
                  "isPlayer": true,
                  "lastInitName": "McCann, J",
                  "lastName": "McCann",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-09-01",
                  "link": "/api/v1/people/543510",
                  "nameFirstLast": "James McCann",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 33,
                  "firstLastName": "James McCann",
                  "lastFirstName": "McCann, James",
                  "birthCountry": "USA",
                  "useName": "James",
                  "id": 543510,
                  "fullFMLName": "James Thomas McCann",
                  "height": "6' 3\"",
                  "nameSlug": "james-mccann-543510",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "McCannon",
                  "draftYear": 2011,
                  "boxscoreName": "McCann",
                  "fullName": "James McCann",
                  "weight": 235,
                  "active": true,
                  "birthCity": "Santa Barbara",
                  "initLastName": "J McCann",
                  "strikeZoneTop": 3.35,
                  "birthDate": "1990-06-13",
                  "primaryNumber": "27",
                  "firstName": "James",
                  "fullLFMName": "McCann, James Thomas",
                  "useLastName": "McCann",
                  "middleName": "Thomas",
                  "strikeZoneBottom": 1.49,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID502043": {
                  "isPlayer": true,
                  "lastInitName": "Gibson, K",
                  "lastName": "Gibson",
                  "birthStateProvince": "IN",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-06-29",
                  "link": "/api/v1/people/502043",
                  "nameFirstLast": "Kyle Gibson",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 35,
                  "firstLastName": "Kyle Gibson",
                  "lastFirstName": "Gibson, Kyle",
                  "birthCountry": "USA",
                  "useName": "Kyle",
                  "id": 502043,
                  "fullFMLName": "Kyle Benjamin Gibson",
                  "height": "6' 6\"",
                  "nameSlug": "kyle-gibson-502043",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Gibby",
                  "draftYear": 2009,
                  "boxscoreName": "Gibson",
                  "fullName": "Kyle Gibson",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Greenfield",
                  "initLastName": "K Gibson",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1987-10-23",
                  "primaryNumber": "48",
                  "firstName": "Kyle",
                  "fullLFMName": "Gibson, Kyle Benjamin",
                  "useLastName": "Gibson",
                  "middleName": "Benjamin",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID673237": {
                  "isPlayer": true,
                  "lastInitName": "Diaz, Y",
                  "lastName": "Diaz",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-09-02",
                  "link": "/api/v1/people/673237",
                  "nameFirstLast": "Yainer Diaz",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 25,
                  "firstLastName": "Yainer Diaz",
                  "lastFirstName": "Diaz, Yainer",
                  "birthCountry": "Dominican Republic",
                  "useName": "Yainer",
                  "id": 673237,
                  "fullFMLName": "Yainer Radhames Diaz",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Lopez",
                  "nameSlug": "yainer-diaz-673237",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Diaz, Y",
                  "fullName": "Yainer Diaz",
                  "weight": 195,
                  "active": true,
                  "birthCity": "Azua",
                  "initLastName": "Y Diaz",
                  "strikeZoneTop": 3.17,
                  "birthDate": "1998-09-21",
                  "primaryNumber": "21",
                  "firstName": "Yainer",
                  "fullLFMName": "Diaz, Yainer Radhames",
                  "useLastName": "Diaz",
                  "middleName": "Radhames",
                  "strikeZoneBottom": 1.45,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID665152": {
                  "isPlayer": true,
                  "lastInitName": "Kremer, D",
                  "lastName": "Kremer",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2020-09-06",
                  "link": "/api/v1/people/665152",
                  "nameFirstLast": "Dean Kremer",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Dean Kremer",
                  "lastFirstName": "Kremer, Dean",
                  "birthCountry": "USA",
                  "useName": "Dean",
                  "id": 665152,
                  "fullFMLName": "Dean Junior Kremer",
                  "height": "6' 2\"",
                  "nameSlug": "dean-kremer-665152",
                  "pronunciation": "KRAY-mer",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2016,
                  "boxscoreName": "Kremer",
                  "fullName": "Dean Kremer",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Stockton",
                  "initLastName": "D Kremer",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1996-01-07",
                  "primaryNumber": "64",
                  "firstName": "Dean",
                  "fullLFMName": "Kremer, Dean Junior",
                  "useLastName": "Kremer",
                  "middleName": "Junior",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID593576": {
                  "isPlayer": true,
                  "lastInitName": "Neris, H",
                  "lastName": "Neris",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-08-05",
                  "link": "/api/v1/people/593576",
                  "nameFirstLast": "Hector Neris",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 34,
                  "firstLastName": "Hector Neris",
                  "lastFirstName": "Neris, Hector",
                  "birthCountry": "Dominican Republic",
                  "useName": "Hector",
                  "id": 593576,
                  "fullFMLName": "Hector Neris",
                  "height": "6' 2\"",
                  "nameSlug": "hector-neris-593576",
                  "pronunciation": "HEHK-ter NAIR-iss",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Compa N",
                  "boxscoreName": "Neris",
                  "fullName": "Hector Neris",
                  "weight": 227,
                  "active": true,
                  "birthCity": "Villa Altagracia",
                  "initLastName": "H Neris",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1989-06-14",
                  "primaryNumber": "50",
                  "firstName": "Hector",
                  "fullLFMName": "Neris, Hector ",
                  "useLastName": "Neris",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID660261": {
                  "isPlayer": true,
                  "lastInitName": "Fujinami, S",
                  "lastName": "Fujinami",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-04-01",
                  "link": "/api/v1/people/660261",
                  "nameFirstLast": "Shintaro Fujinami",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Shintaro Fujinami",
                  "lastFirstName": "Fujinami, Shintaro",
                  "birthCountry": "Japan",
                  "useName": "Shintaro",
                  "id": 660261,
                  "fullFMLName": "Shintaro Fujinami",
                  "height": "6' 6\"",
                  "nameSlug": "shintaro-fujinami-660261",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Fujinami",
                  "fullName": "Shintaro Fujinami",
                  "weight": 180,
                  "active": true,
                  "birthCity": "Sakai",
                  "initLastName": "S Fujinami",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1994-04-12",
                  "primaryNumber": "14",
                  "firstName": "Shintaro",
                  "fullLFMName": "Fujinami, Shintaro",
                  "useLastName": "Fujinami",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID663656": {
                  "isPlayer": true,
                  "lastInitName": "Tucker, K",
                  "lastName": "Tucker",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-07-07",
                  "link": "/api/v1/people/663656",
                  "nameFirstLast": "Kyle Tucker",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 26,
                  "firstLastName": "Kyle Tucker",
                  "lastFirstName": "Tucker, Kyle",
                  "birthCountry": "USA",
                  "useName": "Kyle",
                  "id": 663656,
                  "fullFMLName": "Kyle Daniel Tucker",
                  "height": "6' 4\"",
                  "nameSlug": "kyle-tucker-663656",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2015,
                  "boxscoreName": "Tucker",
                  "fullName": "Kyle Tucker",
                  "weight": 199,
                  "active": true,
                  "birthCity": "Tampa",
                  "initLastName": "K Tucker",
                  "strikeZoneTop": 3.51,
                  "birthDate": "1997-01-17",
                  "primaryNumber": "30",
                  "firstName": "Kyle",
                  "fullLFMName": "Tucker, Kyle Daniel",
                  "useLastName": "Tucker",
                  "middleName": "Daniel",
                  "strikeZoneBottom": 1.69,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID623993": {
                  "isPlayer": true,
                  "lastInitName": "Santander, A",
                  "lastName": "Santander",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-08-18",
                  "link": "/api/v1/people/623993",
                  "nameFirstLast": "Anthony Santander",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Anthony Santander",
                  "lastFirstName": "Santander, Anthony",
                  "birthCountry": "Venezuela",
                  "useName": "Anthony",
                  "id": 623993,
                  "fullFMLName": "Anthony Roger Santander",
                  "height": "6' 2\"",
                  "nameSlug": "anthony-santander-623993",
                  "pronunciation": "SAHN-tahn-dare",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Agua Blanca",
                  "boxscoreName": "Santander",
                  "fullName": "Anthony Santander",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Margarita",
                  "initLastName": "A Santander",
                  "strikeZoneTop": 3.4,
                  "birthDate": "1994-10-19",
                  "primaryNumber": "25",
                  "firstName": "Anthony",
                  "fullLFMName": "Santander, Anthony Roger",
                  "useLastName": "Santander",
                  "middleName": "Roger",
                  "strikeZoneBottom": 1.63,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID641585": {
                  "isPlayer": true,
                  "lastInitName": "France, J",
                  "lastName": "France",
                  "birthStateProvince": "LA",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-05-06",
                  "link": "/api/v1/people/641585",
                  "nameFirstLast": "J.P. France",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "J.P. France",
                  "lastFirstName": "France, J.P.",
                  "birthCountry": "USA",
                  "useName": "J.P.",
                  "id": 641585,
                  "fullFMLName": "Jonathan Patrick France",
                  "height": "6' 0\"",
                  "nameSlug": "j-p-france-641585",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "France, J",
                  "fullName": "J.P. France",
                  "weight": 216,
                  "active": true,
                  "birthCity": "New Orleans",
                  "initLastName": "J France",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1995-04-04",
                  "primaryNumber": "68",
                  "firstName": "Jonathan",
                  "fullLFMName": "France, Jonathan Patrick",
                  "useLastName": "France",
                  "middleName": "Patrick",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID643289": {
                  "isPlayer": true,
                  "lastInitName": "Dubón, M",
                  "lastName": "Dubon",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-07-07",
                  "link": "/api/v1/people/643289",
                  "nameFirstLast": "Mauricio Dubon",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 29,
                  "firstLastName": "Mauricio Dubón",
                  "lastFirstName": "Dubón, Mauricio",
                  "birthCountry": "Honduras",
                  "useName": "Mauricio",
                  "id": 643289,
                  "fullFMLName": "Mauricio Andre Dubón",
                  "height": "6' 0\"",
                  "nameSlug": "mauricio-dubon-643289",
                  "pronunciation": "do-BOHN",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2013,
                  "boxscoreName": "Dubón",
                  "fullName": "Mauricio Dubon",
                  "weight": 173,
                  "active": true,
                  "birthCity": "San Pedro Sula",
                  "initLastName": "M Dubón",
                  "strikeZoneTop": 3.25,
                  "birthDate": "1994-07-19",
                  "primaryNumber": "14",
                  "firstName": "Mauricio",
                  "fullLFMName": "Dubón, Mauricio Andre",
                  "useLastName": "Dubón",
                  "middleName": "Andre",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID686613": {
                  "isPlayer": true,
                  "lastInitName": "Brown, H",
                  "lastName": "Brown",
                  "birthStateProvince": "MI",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-09-05",
                  "link": "/api/v1/people/686613",
                  "nameFirstLast": "Hunter Brown",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 25,
                  "firstLastName": "Hunter Brown",
                  "lastFirstName": "Brown, Hunter",
                  "birthCountry": "USA",
                  "useName": "Hunter",
                  "id": 686613,
                  "fullFMLName": "Hunter Noah Brown",
                  "height": "6' 2\"",
                  "nameSlug": "hunter-brown-686613",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Brown, H",
                  "fullName": "Hunter Brown",
                  "weight": 212,
                  "active": true,
                  "birthCity": "Detroit",
                  "initLastName": "H Brown",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1998-08-29",
                  "primaryNumber": "58",
                  "firstName": "Hunter",
                  "fullLFMName": "Brown, Hunter Noah",
                  "useLastName": "Brown",
                  "middleName": "Noah",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID608324": {
                  "isPlayer": true,
                  "lastInitName": "Bregman, A",
                  "lastName": "Bregman",
                  "birthStateProvince": "NM",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2016-07-25",
                  "link": "/api/v1/people/608324",
                  "nameFirstLast": "Alex Bregman",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 29,
                  "firstLastName": "Alex Bregman",
                  "lastFirstName": "Bregman, Alex",
                  "birthCountry": "USA",
                  "useName": "Alex",
                  "id": 608324,
                  "fullFMLName": "Alexander David Bregman",
                  "height": "6' 0\"",
                  "nameSlug": "alex-bregman-608324",
                  "pronunciation": "BREGG-min",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "A-Breg",
                  "draftYear": 2015,
                  "boxscoreName": "Bregman",
                  "fullName": "Alex Bregman",
                  "weight": 192,
                  "active": true,
                  "birthCity": "Albuquerque",
                  "initLastName": "A Bregman",
                  "strikeZoneTop": 3.01,
                  "birthDate": "1994-03-30",
                  "primaryNumber": "2",
                  "firstName": "Alexander",
                  "fullLFMName": "Bregman, Alexander David",
                  "useLastName": "Bregman",
                  "middleName": "David",
                  "strikeZoneBottom": 1.46,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID668939": {
                  "isPlayer": true,
                  "lastInitName": "Rutschman, A",
                  "lastName": "Rutschman",
                  "birthStateProvince": "OR",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-05-21",
                  "link": "/api/v1/people/668939",
                  "nameFirstLast": "Adley Rutschman",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 25,
                  "firstLastName": "Adley Rutschman",
                  "lastFirstName": "Rutschman, Adley",
                  "birthCountry": "USA",
                  "useName": "Adley",
                  "id": 668939,
                  "fullFMLName": "Adley Stan Rutschman",
                  "height": "6' 2\"",
                  "nameSlug": "adley-rutschman-668939",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Rutschman",
                  "fullName": "Adley Rutschman",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Portland",
                  "initLastName": "A Rutschman",
                  "strikeZoneTop": 3.41,
                  "birthDate": "1998-02-06",
                  "primaryNumber": "35",
                  "firstName": "Adley",
                  "fullLFMName": "Rutschman, Adley Stan",
                  "useLastName": "Rutschman",
                  "middleName": "Stan",
                  "strikeZoneBottom": 1.68,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID676694": {
                  "isPlayer": true,
                  "lastInitName": "Meyers, J",
                  "lastName": "Meyers",
                  "birthStateProvince": "NE",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2021-08-01",
                  "link": "/api/v1/people/676694",
                  "nameFirstLast": "Jake Meyers",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 27,
                  "firstLastName": "Jake Meyers",
                  "lastFirstName": "Meyers, Jake",
                  "birthCountry": "USA",
                  "useName": "Jake",
                  "id": 676694,
                  "fullFMLName": "Jacob Berkshire Meyers",
                  "height": "6' 0\"",
                  "nameSlug": "jake-meyers-676694",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Meyers",
                  "fullName": "Jake Meyers",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Omaha",
                  "initLastName": "J Meyers",
                  "strikeZoneTop": 3.2,
                  "birthDate": "1996-06-18",
                  "primaryNumber": "6",
                  "firstName": "Jacob",
                  "fullLFMName": "Meyers, Jacob Berkshire",
                  "useLastName": "Meyers",
                  "middleName": "Berkshire",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID657097": {
                  "isPlayer": true,
                  "lastInitName": "Webb, J",
                  "lastName": "Webb",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-04-16",
                  "link": "/api/v1/people/657097",
                  "nameFirstLast": "Jacob Webb",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "Jacob Webb",
                  "lastFirstName": "Webb, Jacob",
                  "birthCountry": "USA",
                  "useName": "Jacob",
                  "id": 657097,
                  "fullFMLName": "Jacob Lawrence Webb",
                  "height": "6' 2\"",
                  "nameSlug": "jacob-webb-657097",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2014,
                  "boxscoreName": "Webb",
                  "fullName": "Jacob Webb",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Riverside",
                  "initLastName": "J Webb",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1993-08-15",
                  "primaryNumber": "66",
                  "firstName": "Jacob",
                  "fullLFMName": "Webb, Jacob Lawrence",
                  "useLastName": "Webb",
                  "middleName": "Lawrence",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID676059": {
                  "isPlayer": true,
                  "lastInitName": "Westburg, J",
                  "lastName": "Westburg",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2023-06-26",
                  "link": "/api/v1/people/676059",
                  "nameFirstLast": "Jordan Westburg",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 24,
                  "firstLastName": "Jordan Westburg",
                  "lastFirstName": "Westburg, Jordan",
                  "birthCountry": "USA",
                  "useName": "Jordan",
                  "id": 676059,
                  "fullFMLName": "Jordan Cole Westburg",
                  "height": "6' 2\"",
                  "nameSlug": "jordan-westburg-676059",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2020,
                  "boxscoreName": "Westburg",
                  "fullName": "Jordan Westburg",
                  "weight": 210,
                  "active": true,
                  "birthCity": "New Braunfels",
                  "initLastName": "J Westburg",
                  "strikeZoneTop": 3.42,
                  "birthDate": "1999-02-18",
                  "primaryNumber": "11",
                  "firstName": "Jordan",
                  "fullLFMName": "Westburg, Jordan Cole",
                  "useLastName": "Westburg",
                  "middleName": "Cole",
                  "strikeZoneBottom": 1.64,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID669270": {
                  "isPlayer": true,
                  "lastInitName": "Kuhnel, J",
                  "lastName": "Kuhnel",
                  "birthStateProvince": "NC",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2019-08-16",
                  "link": "/api/v1/people/669270",
                  "nameFirstLast": "Joel Kuhnel",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "Joel Kuhnel",
                  "lastFirstName": "Kuhnel, Joel",
                  "birthCountry": "USA",
                  "useName": "Joel",
                  "id": 669270,
                  "fullFMLName": "Joel Kenneth Kuhnel",
                  "height": "6' 5\"",
                  "nameSlug": "joel-kuhnel-669270",
                  "pronunciation": "COON-uhl",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2016,
                  "boxscoreName": "Kuhnel",
                  "fullName": "Joel Kuhnel",
                  "weight": 290,
                  "active": true,
                  "birthCity": "Goldsboro",
                  "initLastName": "J Kuhnel",
                  "strikeZoneTop": 3.575,
                  "birthDate": "1995-02-19",
                  "primaryNumber": "60",
                  "firstName": "Joel",
                  "fullLFMName": "Kuhnel, Joel Kenneth",
                  "useLastName": "Kuhnel",
                  "middleName": "Kenneth",
                  "strikeZoneBottom": 1.681,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID672335": {
                  "isPlayer": true,
                  "lastInitName": "Pérez, C",
                  "lastName": "Perez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-07-11",
                  "link": "/api/v1/people/672335",
                  "nameFirstLast": "Cionel Perez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Cionel Pérez",
                  "lastFirstName": "Pérez, Cionel",
                  "birthCountry": "Cuba",
                  "useName": "Cionel",
                  "id": 672335,
                  "fullFMLName": "Cionel Felix Pérez",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Viera",
                  "nameSlug": "cionel-perez-672335",
                  "pronunciation": "see-oh-NELL",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "boxscoreName": "Pérez, C",
                  "fullName": "Cionel Perez",
                  "weight": 175,
                  "active": true,
                  "birthCity": "La Habana",
                  "initLastName": "C Pérez",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1996-04-21",
                  "primaryNumber": "58",
                  "firstName": "Cionel",
                  "fullLFMName": "Pérez, Cionel Felix",
                  "useLastName": "Pérez",
                  "middleName": "Felix",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID669720": {
                  "isPlayer": true,
                  "lastInitName": "Hays, A",
                  "lastName": "Hays",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-09-07",
                  "link": "/api/v1/people/669720",
                  "nameFirstLast": "Austin Hays",
                  "primaryPosition": {
                    "code": "7",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "LF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Austin Hays",
                  "lastFirstName": "Hays, Austin",
                  "birthCountry": "USA",
                  "useName": "Austin",
                  "id": 669720,
                  "fullFMLName": "Austin Charles Bryan Hays",
                  "height": "5' 11\"",
                  "nameSlug": "austin-hays-669720",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2016,
                  "boxscoreName": "Hays",
                  "fullName": "Austin Hays",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Daytona Beach",
                  "initLastName": "A Hays",
                  "strikeZoneTop": 3.22,
                  "birthDate": "1995-07-05",
                  "primaryNumber": "21",
                  "firstName": "Austin",
                  "fullLFMName": "Hays, Austin Charles Bryan",
                  "useLastName": "Hays",
                  "middleName": "Charles Bryan",
                  "strikeZoneBottom": 1.48,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID514888": {
                  "isPlayer": true,
                  "lastInitName": "Altuve, J",
                  "lastName": "Altuve",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2011-07-20",
                  "link": "/api/v1/people/514888",
                  "nameFirstLast": "Jose Altuve",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 33,
                  "firstLastName": "Jose Altuve",
                  "lastFirstName": "Altuve, Jose",
                  "birthCountry": "Venezuela",
                  "useName": "Jose",
                  "id": 514888,
                  "fullFMLName": "Jose Carlos Altuve",
                  "height": "5' 6\"",
                  "nameSlug": "jose-altuve-514888",
                  "pronunciation": "al-TOO-vay",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Tuve",
                  "boxscoreName": "Altuve",
                  "fullName": "Jose Altuve",
                  "weight": 166,
                  "active": true,
                  "birthCity": "Maracay",
                  "initLastName": "J Altuve",
                  "strikeZoneTop": 2.82,
                  "birthDate": "1990-05-06",
                  "primaryNumber": "27",
                  "firstName": "Jose",
                  "fullLFMName": "Altuve, Jose Carlos",
                  "useLastName": "Altuve",
                  "middleName": "Carlos",
                  "strikeZoneBottom": 1.25,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID665161": {
                  "isPlayer": true,
                  "lastInitName": "Peña, J",
                  "lastName": "Pena",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-04-07",
                  "link": "/api/v1/people/665161",
                  "nameFirstLast": "Jeremy Pena",
                  "primaryPosition": {
                    "code": "6",
                    "name": "Shortstop",
                    "type": "Infielder",
                    "abbreviation": "SS"
                  },
                  "currentAge": 25,
                  "firstLastName": "Jeremy Peña",
                  "lastFirstName": "Peña, Jeremy",
                  "birthCountry": "Dominican Republic",
                  "useName": "Jeremy",
                  "id": 665161,
                  "fullFMLName": "Jeremy Joan Peña",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Pineyro",
                  "nameSlug": "jeremy-pena-665161",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "La Tormenta",
                  "draftYear": 2018,
                  "boxscoreName": "Peña",
                  "fullName": "Jeremy Pena",
                  "weight": 202,
                  "active": true,
                  "birthCity": "Santo Domingo",
                  "initLastName": "J Peña",
                  "strikeZoneTop": 3.57,
                  "birthDate": "1997-09-22",
                  "primaryNumber": "3",
                  "firstName": "Jeremy",
                  "fullLFMName": "Peña, Jeremy Joan",
                  "useLastName": "Peña",
                  "middleName": "Joan",
                  "strikeZoneBottom": 1.71,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID664353": {
                  "isPlayer": true,
                  "lastInitName": "Urquidy, J",
                  "lastName": "Urquidy",
                  "birthStateProvince": "Sinaloa",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-07-02",
                  "link": "/api/v1/people/664353",
                  "nameFirstLast": "Jose Urquidy",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "José Urquidy",
                  "lastFirstName": "Urquidy, José",
                  "birthCountry": "Mexico",
                  "useName": "Jose",
                  "id": 664353,
                  "fullFMLName": "José Luis Urquidy",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Hernandez",
                  "nameSlug": "jose-urquidy-664353",
                  "pronunciation": "ur-KEE-dee",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Urquidy",
                  "fullName": "Jose Urquidy",
                  "weight": 217,
                  "active": true,
                  "birthCity": "Mazatlan",
                  "initLastName": "J Urquidy",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1995-05-01",
                  "primaryNumber": "65",
                  "firstName": "Jose",
                  "fullLFMName": "Urquidy, José Luis",
                  "useLastName": "Urquidy",
                  "middleName": "Luis",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID666974": {
                  "isPlayer": true,
                  "lastInitName": "Cano, Y",
                  "lastName": "Cano",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-05-11",
                  "link": "/api/v1/people/666974",
                  "nameFirstLast": "Yennier Cano",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Yennier Cano",
                  "lastFirstName": "Cano, Yennier",
                  "birthCountry": "Cuba",
                  "useName": "Yennier",
                  "id": 666974,
                  "fullFMLName": "Yennier  Cano",
                  "height": "6' 4\"",
                  "nameMatrilineal": "Banes",
                  "nameSlug": "yennier-cano-666974",
                  "pronunciation": "yen-NEER",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Cano",
                  "fullName": "Yennier Cano",
                  "weight": 245,
                  "active": true,
                  "birthCity": "Havana",
                  "initLastName": "Y Cano",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1994-03-09",
                  "primaryNumber": "78",
                  "firstName": "Yennier",
                  "fullLFMName": "Cano, Yennier",
                  "useLastName": "Cano",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID607644": {
                  "isPlayer": true,
                  "lastInitName": "Means, J",
                  "lastName": "Means",
                  "birthStateProvince": "KS",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2018-09-26",
                  "link": "/api/v1/people/607644",
                  "nameFirstLast": "John Means",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "John Means",
                  "lastFirstName": "Means, John",
                  "birthCountry": "USA",
                  "useName": "John",
                  "id": 607644,
                  "fullFMLName": "John Alan Means",
                  "height": "6' 4\"",
                  "nameSlug": "john-means-607644",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Meansy",
                  "draftYear": 2014,
                  "boxscoreName": "Means",
                  "fullName": "John Means",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Olathe",
                  "initLastName": "J Means",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1993-04-24",
                  "primaryNumber": "47",
                  "firstName": "John",
                  "fullLFMName": "Means, John Alan",
                  "useLastName": "Means",
                  "middleName": "Alan",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID605347": {
                  "isPlayer": true,
                  "lastInitName": "López, J",
                  "lastName": "Lopez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2015-09-29",
                  "link": "/api/v1/people/605347",
                  "nameFirstLast": "Jorge Lopez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "Jorge López",
                  "lastFirstName": "López, Jorge",
                  "birthCountry": "Puerto Rico",
                  "useName": "Jorge",
                  "id": 605347,
                  "fullFMLName": "Jorge Yabiel López",
                  "height": "6' 3\"",
                  "nameMatrilineal": "Ramos",
                  "nameSlug": "jorge-lopez-605347",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "El Pichu",
                  "draftYear": 2011,
                  "boxscoreName": "López, Jo",
                  "fullName": "Jorge Lopez",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Caguas",
                  "initLastName": "J López",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1993-02-10",
                  "primaryNumber": "73",
                  "firstName": "Jorge",
                  "fullLFMName": "López, Jorge Yabiel",
                  "useLastName": "López",
                  "middleName": "Yabiel",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID669084": {
                  "isPlayer": true,
                  "lastInitName": "Hall, D",
                  "lastName": "Hall",
                  "birthStateProvince": "GA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-08-13",
                  "link": "/api/v1/people/669084",
                  "nameFirstLast": "DL Hall",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 25,
                  "firstLastName": "DL Hall",
                  "lastFirstName": "Hall, DL",
                  "birthCountry": "USA",
                  "useName": "DL",
                  "id": 669084,
                  "fullFMLName": "Dayton Lane Hall",
                  "height": "6' 2\"",
                  "nameSlug": "dl-hall-669084",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Hall, DL",
                  "fullName": "DL Hall",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Valdosta",
                  "initLastName": "D Hall",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1998-09-19",
                  "primaryNumber": "24",
                  "firstName": "Dayton",
                  "fullLFMName": "Hall, Dayton Lane",
                  "useLastName": "Hall",
                  "middleName": "Lane",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID434378": {
                  "isPlayer": true,
                  "lastInitName": "Verlander, J",
                  "lastName": "Verlander",
                  "birthStateProvince": "VA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2005-07-04",
                  "link": "/api/v1/people/434378",
                  "nameFirstLast": "Justin Verlander",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 40,
                  "firstLastName": "Justin Verlander",
                  "lastFirstName": "Verlander, Justin",
                  "birthCountry": "USA",
                  "useName": "Justin",
                  "id": 434378,
                  "fullFMLName": "Justin Brooks Verlander",
                  "height": "6' 5\"",
                  "nameSlug": "justin-verlander-434378",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "J V",
                  "draftYear": 2004,
                  "boxscoreName": "Verlander",
                  "fullName": "Justin Verlander",
                  "weight": 235,
                  "active": true,
                  "birthCity": "Manakin-Sabot",
                  "initLastName": "J Verlander",
                  "strikeZoneTop": 3.575,
                  "birthDate": "1983-02-20",
                  "primaryNumber": "35",
                  "firstName": "Justin",
                  "fullLFMName": "Verlander, Justin Brooks",
                  "useLastName": "Verlander",
                  "middleName": "Brooks",
                  "strikeZoneBottom": 1.681,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID543056": {
                  "isPlayer": true,
                  "lastInitName": "Coulombe, D",
                  "lastName": "Coulombe",
                  "birthStateProvince": "MO",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-09-16",
                  "link": "/api/v1/people/543056",
                  "nameFirstLast": "Danny Coulombe",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 33,
                  "firstLastName": "Danny Coulombe",
                  "lastFirstName": "Coulombe, Danny",
                  "birthCountry": "USA",
                  "useName": "Danny",
                  "id": 543056,
                  "fullFMLName": "Daniel Paul Coulombe",
                  "height": "5' 10\"",
                  "nameSlug": "danny-coulombe-543056",
                  "pronunciation": "KOO-lohm",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Frenchie",
                  "draftYear": 2012,
                  "boxscoreName": "Coulombe",
                  "fullName": "Danny Coulombe",
                  "weight": 190,
                  "active": true,
                  "birthCity": "St. Louis",
                  "initLastName": "D Coulombe",
                  "strikeZoneTop": 3.301,
                  "birthDate": "1989-10-26",
                  "primaryNumber": "54",
                  "firstName": "Daniel",
                  "fullLFMName": "Coulombe, Daniel Paul",
                  "useLastName": "Coulombe",
                  "middleName": "Paul",
                  "strikeZoneBottom": 1.504,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID656811": {
                  "isPlayer": true,
                  "lastInitName": "O'Hearn, R",
                  "lastName": "O'Hearn",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-07-31",
                  "link": "/api/v1/people/656811",
                  "nameFirstLast": "Ryan O'Hearn",
                  "primaryPosition": {
                    "code": "3",
                    "name": "First Base",
                    "type": "Infielder",
                    "abbreviation": "1B"
                  },
                  "currentAge": 30,
                  "firstLastName": "Ryan O'Hearn",
                  "lastFirstName": "O'Hearn, Ryan",
                  "birthCountry": "USA",
                  "useName": "Ryan",
                  "id": 656811,
                  "fullFMLName": "Ryan Patrick O'Hearn",
                  "height": "6' 3\"",
                  "nameSlug": "ryan-o-hearn-656811",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Brohearn",
                  "draftYear": 2014,
                  "boxscoreName": "O'Hearn",
                  "fullName": "Ryan O'Hearn",
                  "weight": 220,
                  "active": true,
                  "birthCity": "Dunedin",
                  "initLastName": "R O'Hearn",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1993-07-26",
                  "primaryNumber": "32",
                  "firstName": "Ryan",
                  "fullLFMName": "O'Hearn, Ryan Patrick",
                  "useLastName": "O'Hearn",
                  "middleName": "Patrick",
                  "strikeZoneBottom": 1.7,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID676801": {
                  "isPlayer": true,
                  "lastInitName": "McCormick, C",
                  "lastName": "McCormick",
                  "birthStateProvince": "PA",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2021-04-01",
                  "link": "/api/v1/people/676801",
                  "nameFirstLast": "Chas McCormick",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Chas McCormick",
                  "lastFirstName": "McCormick, Chas",
                  "birthCountry": "USA",
                  "useName": "Chas",
                  "id": 676801,
                  "fullFMLName": "Chas Kane McCormick",
                  "height": "6' 0\"",
                  "nameSlug": "chas-mccormick-676801",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "McCormick",
                  "fullName": "Chas McCormick",
                  "weight": 208,
                  "active": true,
                  "birthCity": "West Chester",
                  "initLastName": "C McCormick",
                  "strikeZoneTop": 3.26,
                  "birthDate": "1995-04-19",
                  "primaryNumber": "20",
                  "firstName": "Chas",
                  "fullLFMName": "McCormick, Chas Kane",
                  "useLastName": "McCormick",
                  "middleName": "Kane",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID656775": {
                  "isPlayer": true,
                  "lastInitName": "Mullins, C",
                  "lastName": "Mullins",
                  "birthStateProvince": "NC",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-08-10",
                  "link": "/api/v1/people/656775",
                  "nameFirstLast": "Cedric Mullins",
                  "nameSuffix": "II",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Cedric Mullins",
                  "lastFirstName": "Mullins, Cedric",
                  "birthCountry": "USA",
                  "useName": "Cedric",
                  "id": 656775,
                  "fullFMLName": "Boyce Cedric Mullins",
                  "height": "5' 9\"",
                  "nameSlug": "cedric-mullins-656775",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2015,
                  "nameTitle": "II",
                  "boxscoreName": "Mullins",
                  "fullName": "Cedric Mullins",
                  "weight": 175,
                  "active": true,
                  "birthCity": "Greensboro",
                  "initLastName": "C Mullins",
                  "strikeZoneTop": 3.35,
                  "birthDate": "1994-10-01",
                  "primaryNumber": "31",
                  "firstName": "Boyce",
                  "fullLFMName": "Mullins, Boyce Cedric",
                  "useLastName": "Mullins",
                  "middleName": "Cedric",
                  "strikeZoneBottom": 1.56,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID670541": {
                  "isPlayer": true,
                  "lastInitName": "Alvarez, Y",
                  "lastName": "Alvarez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-06-09",
                  "link": "/api/v1/people/670541",
                  "nameFirstLast": "Yordan Alvarez",
                  "primaryPosition": {
                    "code": "7",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "LF"
                  },
                  "currentAge": 26,
                  "firstLastName": "Yordan Alvarez",
                  "lastFirstName": "Alvarez, Yordan",
                  "birthCountry": "Cuba",
                  "useName": "Yordan",
                  "id": 670541,
                  "fullFMLName": "Yordan Ruben Alvarez",
                  "height": "6' 5\"",
                  "nameMatrilineal": "Cadogan",
                  "nameSlug": "yordan-alvarez-670541",
                  "pronunciation": "YOR-dahn",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Yordan",
                  "boxscoreName": "Alvarez, Y",
                  "fullName": "Yordan Alvarez",
                  "weight": 225,
                  "active": true,
                  "birthCity": "Las Tunas",
                  "initLastName": "Y Alvarez",
                  "strikeZoneTop": 3.51,
                  "birthDate": "1997-06-27",
                  "primaryNumber": "44",
                  "firstName": "Yordan",
                  "fullLFMName": "Alvarez, Yordan Ruben",
                  "useLastName": "Alvarez",
                  "middleName": "Ruben",
                  "strikeZoneBottom": 1.73,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                }
              },
              "probablePitchers": {
                "away": {
                  "link": "/api/v1/people/680694",
                  "fullName": "Kyle Bradish",
                  "id": 680694
                },
                "home": {
                  "link": "/api/v1/people/664299",
                  "fullName": "Cristian Javier",
                  "id": 664299
                }
              },
              "primaryDatacaster": {
                "link": "/api/v1/people/802252",
                "fullName": "August Mueller",
                "id": 802252
              },
              "gameInfo": {
                "firstPitch": "2023-09-20T18:12:00.000Z",
                "gameDurationMinutes": 176,
                "attendance": 36427
              },
              "flags": {
                "homeTeamNoHitter": false,
                "awayTeamPerfectGame": false,
                "awayTeamNoHitter": false,
                "perfectGame": false,
                "homeTeamPerfectGame": false,
                "noHitter": false
              },
              "alerts": [],
              "datetime": {
                "dateTime": "2023-09-20T18:10:00Z",
                "dayNight": "day",
                "ampm": "PM",
                "originalDate": "2023-09-20",
                "time": "1:10",
                "officialDate": "2023-09-20"
              },
              "review": {
                "away": {
                  "used": 1,
                  "remaining": 0
                },
                "hasChallenges": true,
                "home": {
                  "used": 0,
                  "remaining": 1
                }
              },
              "weather": {
                "condition": "Roof Closed",
                "temp": "73",
                "wind": "0 mph, None"
              },
              "moundVisits": {
                "away": {
                  "used": 2,
                  "remaining": 3
                },
                "home": {
                  "used": 1,
                  "remaining": 4
                }
              },
              "status": {
                "codedGameState": "F",
                "abstractGameCode": "F",
                "abstractGameState": "Final",
                "detailedState": "Final",
                "startTimeTBD": false,
                "statusCode": "F"
              },
              "officialVenue": {
                "link": "/api/v1/venues/2392",
                "id": 2392
              }
            },
            "currentPlay": {
              "result": {
                "homeScore": 2,
                "awayScore": 1,
                "rbi": 1,
                "description": "Mauricio Dubon singles on a line drive to right fielder Anthony Santander.   Yainer Diaz scores.",
                "isOut": false,
                "eventType": "single",
                "type": "atBat",
                "event": "Single"
              },
              "actionIndex": [],
              "runnerIndex": [
                0,
                1
              ],
              "pitchIndex": [
                0
              ],
              "playEndTime": "2023-09-20T21:08:24.163Z",
              "about": {
                "hasOut": false,
                "captivatingIndex": 60,
                "inning": 9,
                "isScoringPlay": true,
                "atBatIndex": 69,
                "startTime": "2023-09-20T21:07:57.216Z",
                "isTopInning": false,
                "endTime": "2023-09-20T21:08:24.163Z",
                "hasReview": false,
                "halfInning": "bottom",
                "isComplete": true
              },
              "count": {
                "outs": 1,
                "balls": 0,
                "strikes": 0
              },
              "atBatIndex": 69,
              "runners": [
                {
                  "credits": [
                    {
                      "position": {
                        "code": "9",
                        "name": "Outfielder",
                        "type": "Outfielder",
                        "abbreviation": "RF"
                      },
                      "credit": "f_fielded_ball",
                      "player": {
                        "link": "/api/v1/people/623993",
                        "id": 623993
                      }
                    }
                  ],
                  "details": {
                    "playIndex": 0,
                    "responsiblePitcher": null,
                    "earned": false,
                    "rbi": false,
                    "teamUnearned": false,
                    "eventType": "single",
                    "isScoringEvent": false,
                    "event": "Single",
                    "runner": {
                      "link": "/api/v1/people/643289",
                      "fullName": "Mauricio Dubon",
                      "id": 643289
                    },
                    "movementReason": null
                  },
                  "movement": {
                    "outNumber": null,
                    "outBase": null,
                    "start": null,
                    "isOut": false,
                    "end": "1B",
                    "originBase": null
                  }
                },
                {
                  "credits": [],
                  "details": {
                    "playIndex": 0,
                    "responsiblePitcher": {
                      "link": "/api/v1/people/543056",
                      "id": 543056
                    },
                    "earned": true,
                    "rbi": true,
                    "teamUnearned": false,
                    "eventType": "single",
                    "isScoringEvent": true,
                    "event": "Single",
                    "runner": {
                      "link": "/api/v1/people/673237",
                      "fullName": "Yainer Diaz",
                      "id": 673237
                    },
                    "movementReason": "r_adv_play"
                  },
                  "movement": {
                    "outNumber": null,
                    "outBase": null,
                    "start": "3B",
                    "isOut": false,
                    "end": "score",
                    "originBase": "3B"
                  }
                }
              ],
              "playEvents": [
                {
                  "playId": "aea6b8a7-9850-47da-9e0a-2042d2a5de4b",
                  "pitchData": {
                    "endSpeed": 79.4,
                    "extension": 5.932061104280498,
                    "breaks": {
                      "spinRate": 2773,
                      "breakHorizontal": 0.2,
                      "breakAngle": 0,
                      "breakLength": 7.2,
                      "breakVertical": -34.1,
                      "breakY": 24,
                      "breakVerticalInduced": 2.5,
                      "spinDirection": 209
                    },
                    "startSpeed": 86.5,
                    "zone": 8,
                    "plateTime": 0.43550312043088013,
                    "coordinates": {
                      "pfxX": -0.24302567002477538,
                      "pX": -0.16732244910829744,
                      "pZ": 1.8478543382133463,
                      "pfxZ": 1.8165218162116457,
                      "vY0": -125.96312465762941,
                      "vZ0": -4.405598182669926,
                      "vX0": 0.8129706921710971,
                      "z0": 5.9973379954494215,
                      "y0": 50.00618257216229,
                      "aX": -0.3891439569541984,
                      "aY": 26.550343077243838,
                      "x": 123.38,
                      "x0": -0.4632607135112468,
                      "aZ": -29.27160205236917,
                      "y": 188.89
                    },
                    "typeConfidence": 0.9,
                    "strikeZoneTop": 3.25,
                    "strikeZoneBottom": 1.52
                  },
                  "isPitch": true,
                  "pitchNumber": 1,
                  "count": {
                    "outs": 1,
                    "balls": 0,
                    "strikes": 0
                  },
                  "index": 0,
                  "details": {
                    "call": {
                      "code": "E",
                      "description": "In play, run(s)"
                    },
                    "ballColor": "rgba(26, 86, 190, 1.0)",
                    "code": "E",
                    "description": "In play, run(s)",
                    "isBall": false,
                    "isOut": false,
                    "type": {
                      "code": "FC",
                      "description": "Cutter"
                    },
                    "trailColor": "rgba(152, 0, 101, 1.0)",
                    "hasReview": false,
                    "isInPlay": true,
                    "isStrike": false
                  },
                  "hitData": {
                    "hardness": "medium",
                    "coordinates": {
                      "coordX": 173.11,
                      "coordY": 122.46
                    },
                    "launchSpeed": 85.1,
                    "location": "9",
                    "totalDistance": 194,
                    "trajectory": "line_drive",
                    "launchAngle": 14
                  },
                  "startTime": "2023-09-20T21:08:13.961Z",
                  "endTime": "2023-09-20T21:08:24.163Z",
                  "type": "pitch"
                }
              ],
              "matchup": {
                "splits": {
                  "batter": "vs_LHP",
                  "menOnBase": "Men_On",
                  "pitcher": "vs_RHB"
                },
                "batter": {
                  "link": "/api/v1/people/643289",
                  "fullName": "Mauricio Dubon",
                  "id": 643289
                },
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "batterHotColdZones": [
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "01",
                    "value": ".429"
                  },
                  {
                    "temp": "warm",
                    "color": "rgba(234, 147, 153, .55)",
                    "zone": "02",
                    "value": "1.083"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "03",
                    "value": ".542"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "04",
                    "value": ".677"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "05",
                    "value": ".756"
                  },
                  {
                    "temp": "cool",
                    "color": "rgba(150, 188, 255, .55)",
                    "zone": "06",
                    "value": ".563"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "07",
                    "value": ".808"
                  },
                  {
                    "temp": "warm",
                    "color": "rgba(234, 147, 153, .55)",
                    "zone": "08",
                    "value": "1.054"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "09",
                    "value": ".690"
                  },
                  {
                    "temp": "cool",
                    "color": "rgba(150, 188, 255, .55)",
                    "zone": "11",
                    "value": ".586"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "12",
                    "value": ".524"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "13",
                    "value": ".810"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "14",
                    "value": ".500"
                  }
                ],
                "batterHotColdZoneStats": {
                  "stats": [
                    {
                      "splits": [
                        {
                          "stat": {
                            "name": "exitVelocity",
                            "zones": [
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "01",
                                "value": "88.54"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "02",
                                "value": "92.36"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "03",
                                "value": "90.28"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "04",
                                "value": "84.16"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "05",
                                "value": "88.50"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "06",
                                "value": "92.22"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "07",
                                "value": "89.95"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "08",
                                "value": "91.67"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "09",
                                "value": "88.40"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "11",
                                "value": "72.18"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "12",
                                "value": "84.52"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "13",
                                "value": "83.14"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "14",
                                "value": "78.40"
                              }
                            ]
                          }
                        },
                        {
                          "stat": {
                            "name": "battingAverage",
                            "zones": [
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "01",
                                "value": ".211"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "02",
                                "value": ".375"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "03",
                                "value": ".250"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "04",
                                "value": ".290"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "05",
                                "value": ".318"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "06",
                                "value": ".219"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "07",
                                "value": ".308"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "08",
                                "value": ".411"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "09",
                                "value": ".262"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "11",
                                "value": ".182"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "12",
                                "value": ".211"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "13",
                                "value": ".297"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "14",
                                "value": ".221"
                              }
                            ]
                          }
                        },
                        {
                          "stat": {
                            "name": "onBasePlusSlugging",
                            "zones": [
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "01",
                                "value": ".429"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "02",
                                "value": "1.083"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "03",
                                "value": ".542"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "04",
                                "value": ".677"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "05",
                                "value": ".756"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "06",
                                "value": ".563"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "07",
                                "value": ".808"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "08",
                                "value": "1.054"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "09",
                                "value": ".690"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "11",
                                "value": ".586"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "12",
                                "value": ".524"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "13",
                                "value": ".810"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "14",
                                "value": ".500"
                              }
                            ]
                          }
                        }
                      ],
                      "exemptions": [],
                      "type": {
                        "displayName": "hotColdZones"
                      },
                      "group": {
                        "displayName": "hitting"
                      }
                    }
                  ]
                },
                "postOnFirst": {
                  "link": "/api/v1/people/643289",
                  "fullName": "Mauricio Dubon",
                  "id": 643289
                },
                "pitcher": {
                  "link": "/api/v1/people/543056",
                  "fullName": "Danny Coulombe",
                  "id": 543056
                },
                "pitcherHotColdZones": [],
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              }
            }
          }
        ],
        "startTime": "2023-09-20T18:10:00Z",
        "lastUpdate": "2023-09-21T18:43:51.511Z",
        "awayTeamLogoSlug": "baltimore-orioles",
        "homeTeamLogoSlug": "houston-astros",
        "gameStarted": "true",
        "gameEnded": "true",
        "liveGameID": null,
        "livegame": null,
        "liveGameData": [
          {
            "startingGameData": {
              "venue": {
                "name": "Minute Maid Park",
                "link": "/api/v1/venues/2392",
                "timeZone": {
                  "offset": -5,
                  "tz": "CDT",
                  "offsetAtGameTime": -5,
                  "id": "America/Chicago"
                },
                "active": true,
                "season": "2023",
                "location": {
                  "elevation": 45,
                  "country": "USA",
                  "city": "Houston",
                  "phone": "(713) 259-8000",
                  "address1": "501 Crawford Street",
                  "postalCode": "77002",
                  "defaultCoordinates": {
                    "latitude": 29.756967,
                    "longitude": -95.355509
                  },
                  "state": "Texas",
                  "azimuthAngle": 343,
                  "stateAbbrev": "TX"
                },
                "id": 2392,
                "fieldInfo": {
                  "turfType": "Grass",
                  "leftCenter": 362,
                  "leftLine": 315,
                  "rightCenter": 373,
                  "rightLine": 326,
                  "roofType": "Retractable",
                  "center": 409,
                  "capacity": 41000
                }
              },
              "game": {
                "doubleHeader": "N",
                "calendarEventID": "14-716508-2023-09-20",
                "gameNumber": 1,
                "season": "2023",
                "pk": 716508,
                "id": "2023/09/20/balmlb-houmlb-1",
                "tiebreaker": "N",
                "type": "R",
                "gamedayType": "P",
                "seasonDisplay": "2023"
              },
              "officialScorer": {
                "link": "/api/v1/people/431016",
                "fullName": "Rick Blount",
                "id": 431016
              },
              "teams": {
                "away": {
                  "teamName": "Orioles",
                  "venue": {
                    "name": "Oriole Park at Camden Yards",
                    "link": "/api/v1/venues/2",
                    "id": 2
                  },
                  "locationName": "Baltimore",
                  "firstYearOfPlay": "1901",
                  "league": {
                    "name": "American League",
                    "link": "/api/v1/league/103",
                    "id": 103
                  },
                  "clubName": "Orioles",
                  "link": "/api/v1/teams/110",
                  "teamCode": "bal",
                  "fileCode": "bal",
                  "active": true,
                  "allStarStatus": "N",
                  "springVenue": {
                    "link": "/api/v1/venues/2508",
                    "id": 2508
                  },
                  "abbreviation": "BAL",
                  "springLeague": {
                    "name": "Grapefruit League",
                    "link": "/api/v1/league/115",
                    "id": 115,
                    "abbreviation": "GL"
                  },
                  "division": {
                    "name": "American League East",
                    "link": "/api/v1/divisions/201",
                    "id": 201
                  },
                  "record": {
                    "divisionGamesBack": "-",
                    "wins": 95,
                    "conferenceGamesBack": "-",
                    "records": {},
                    "springLeagueGamesBack": "-",
                    "leagueGamesBack": "-",
                    "divisionLeader": false,
                    "losses": 57,
                    "wildCardGamesBack": "-",
                    "sportGamesBack": "-",
                    "leagueRecord": {
                      "wins": 95,
                      "pct": ".625",
                      "ties": 0,
                      "losses": 57
                    },
                    "gamesPlayed": 152,
                    "winningPercentage": ".625"
                  },
                  "name": "Baltimore Orioles",
                  "season": 2023,
                  "id": 110,
                  "shortName": "Baltimore",
                  "sport": {
                    "link": "/api/v1/sports/1",
                    "name": "Major League Baseball",
                    "id": 1
                  },
                  "franchiseName": "Baltimore"
                },
                "home": {
                  "teamName": "Astros",
                  "venue": {
                    "name": "Minute Maid Park",
                    "link": "/api/v1/venues/2392",
                    "id": 2392
                  },
                  "locationName": "Houston",
                  "firstYearOfPlay": "1962",
                  "league": {
                    "name": "American League",
                    "link": "/api/v1/league/103",
                    "id": 103
                  },
                  "clubName": "Astros",
                  "link": "/api/v1/teams/117",
                  "teamCode": "hou",
                  "fileCode": "hou",
                  "active": true,
                  "allStarStatus": "N",
                  "springVenue": {
                    "link": "/api/v1/venues/5000",
                    "id": 5000
                  },
                  "abbreviation": "HOU",
                  "springLeague": {
                    "name": "Grapefruit League",
                    "link": "/api/v1/league/115",
                    "id": 115,
                    "abbreviation": "GL"
                  },
                  "division": {
                    "name": "American League West",
                    "link": "/api/v1/divisions/200",
                    "id": 200
                  },
                  "record": {
                    "divisionGamesBack": "-",
                    "wins": 85,
                    "conferenceGamesBack": "-",
                    "records": {},
                    "springLeagueGamesBack": "-",
                    "leagueGamesBack": "-",
                    "divisionLeader": false,
                    "losses": 68,
                    "wildCardGamesBack": "-",
                    "sportGamesBack": "-",
                    "leagueRecord": {
                      "wins": 85,
                      "pct": ".556",
                      "ties": 0,
                      "losses": 68
                    },
                    "gamesPlayed": 153,
                    "winningPercentage": ".556"
                  },
                  "name": "Houston Astros",
                  "season": 2023,
                  "id": 117,
                  "shortName": "Houston",
                  "sport": {
                    "link": "/api/v1/sports/1",
                    "name": "Major League Baseball",
                    "id": 1
                  },
                  "franchiseName": "Houston"
                }
              },
              "players": {
                "ID624428": {
                  "isPlayer": true,
                  "lastInitName": "Frazier, A",
                  "lastName": "Frazier",
                  "birthStateProvince": "GA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2016-06-24",
                  "link": "/api/v1/people/624428",
                  "nameFirstLast": "Adam Frazier",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 31,
                  "firstLastName": "Adam Frazier",
                  "lastFirstName": "Frazier, Adam",
                  "birthCountry": "USA",
                  "useName": "Adam",
                  "id": 624428,
                  "fullFMLName": "Adam Timothy Frazier",
                  "height": "5' 10\"",
                  "nameSlug": "adam-frazier-624428",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Fraz",
                  "draftYear": 2013,
                  "boxscoreName": "Frazier",
                  "fullName": "Adam Frazier",
                  "weight": 180,
                  "active": true,
                  "birthCity": "Athens",
                  "initLastName": "A Frazier",
                  "strikeZoneTop": 3.18,
                  "birthDate": "1991-12-14",
                  "primaryNumber": "12",
                  "firstName": "Adam",
                  "fullLFMName": "Frazier, Adam Timothy",
                  "useLastName": "Frazier",
                  "middleName": "Timothy",
                  "strikeZoneBottom": 1.45,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID664285": {
                  "isPlayer": true,
                  "lastInitName": "Valdez, F",
                  "lastName": "Valdez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-08-21",
                  "link": "/api/v1/people/664285",
                  "nameFirstLast": "Framber Valdez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Framber Valdez",
                  "lastFirstName": "Valdez, Framber",
                  "birthCountry": "Dominican Republic",
                  "useName": "Framber",
                  "id": 664285,
                  "fullFMLName": "Framber Valdez",
                  "height": "5' 11\"",
                  "nameMatrilineal": "Pinales",
                  "nameSlug": "framber-valdez-664285",
                  "pronunciation": "FRAHM-burr",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "boxscoreName": "Valdez, F",
                  "fullName": "Framber Valdez",
                  "weight": 239,
                  "active": true,
                  "birthCity": "Palenque",
                  "initLastName": "F Valdez",
                  "strikeZoneTop": 3.319,
                  "birthDate": "1993-11-19",
                  "primaryNumber": "59",
                  "firstName": "Framber",
                  "fullLFMName": "Valdez, Framber",
                  "useLastName": "Valdez",
                  "strikeZoneBottom": 1.513,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID455117": {
                  "isPlayer": true,
                  "lastInitName": "Maldonado, M",
                  "lastName": "Maldonado",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2011-09-03",
                  "link": "/api/v1/people/455117",
                  "nameFirstLast": "Martin Maldonado",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 37,
                  "firstLastName": "Martín Maldonado",
                  "lastFirstName": "Maldonado, Martín",
                  "birthCountry": "Puerto Rico",
                  "useName": "Martin",
                  "id": 455117,
                  "fullFMLName": "Martín Maldonado",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Valdes",
                  "nameSlug": "martin-maldonado-455117",
                  "pronunciation": "Mar-TEEN",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Martincito",
                  "draftYear": 2004,
                  "boxscoreName": "Maldonado, M",
                  "fullName": "Martin Maldonado",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Naguabo",
                  "initLastName": "M Maldonado",
                  "strikeZoneTop": 3.13,
                  "birthDate": "1986-08-16",
                  "primaryNumber": "15",
                  "firstName": "Martin",
                  "fullLFMName": "Maldonado, Martín",
                  "useLastName": "Maldonado",
                  "strikeZoneBottom": 1.43,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID650556": {
                  "isPlayer": true,
                  "lastInitName": "Abreu, B",
                  "lastName": "Abreu",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-07-31",
                  "link": "/api/v1/people/650556",
                  "nameFirstLast": "Bryan Abreu",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 26,
                  "firstLastName": "Bryan Abreu",
                  "lastFirstName": "Abreu, Bryan",
                  "birthCountry": "Dominican Republic",
                  "useName": "Bryan",
                  "id": 650556,
                  "fullFMLName": "Bryan Enrique Abreu",
                  "height": "6' 1\"",
                  "nameMatrilineal": "Jimenez",
                  "nameSlug": "bryan-abreu-650556",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Abreu, B",
                  "fullName": "Bryan Abreu",
                  "weight": 225,
                  "active": true,
                  "birthCity": "Santo Domingo Centro",
                  "initLastName": "B Abreu",
                  "strikeZoneTop": 3.411,
                  "birthDate": "1997-04-22",
                  "primaryNumber": "52",
                  "firstName": "Bryan",
                  "fullLFMName": "Abreu, Bryan Enrique",
                  "useLastName": "Abreu",
                  "middleName": "Enrique",
                  "strikeZoneBottom": 1.565,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID657508": {
                  "isPlayer": true,
                  "lastInitName": "Baumann, M",
                  "lastName": "Baumann",
                  "birthStateProvince": "MN",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2021-09-07",
                  "link": "/api/v1/people/657508",
                  "nameFirstLast": "Mike Baumann",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "Mike Baumann",
                  "lastFirstName": "Baumann, Mike",
                  "birthCountry": "USA",
                  "useName": "Mike",
                  "id": 657508,
                  "fullFMLName": "Michael Thomas Baumann",
                  "height": "6' 4\"",
                  "nameSlug": "mike-baumann-657508",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Baumann",
                  "fullName": "Mike Baumann",
                  "weight": 240,
                  "active": true,
                  "birthCity": "Mahtomedi",
                  "initLastName": "M Baumann",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1995-09-10",
                  "primaryNumber": "53",
                  "firstName": "Michael",
                  "fullLFMName": "Baumann, Michael Thomas",
                  "useLastName": "Baumann",
                  "middleName": "Thomas",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID606160": {
                  "isPlayer": true,
                  "lastInitName": "Montero, R",
                  "lastName": "Montero",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-05-14",
                  "link": "/api/v1/people/606160",
                  "nameFirstLast": "Rafael Montero",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 32,
                  "firstLastName": "Rafael Montero",
                  "lastFirstName": "Montero, Rafael",
                  "birthCountry": "Dominican Republic",
                  "useName": "Rafael",
                  "id": 606160,
                  "fullFMLName": "Rafael Montero",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Quezada",
                  "nameSlug": "rafael-montero-606160",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Monte",
                  "boxscoreName": "Montero",
                  "fullName": "Rafael Montero",
                  "weight": 190,
                  "active": true,
                  "birthCity": "Higuerito",
                  "initLastName": "R Montero",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1990-10-17",
                  "primaryNumber": "47",
                  "firstName": "Rafael",
                  "fullLFMName": "Montero, Rafael",
                  "useLastName": "Montero",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID622761": {
                  "isPlayer": true,
                  "lastInitName": "Mateo, J",
                  "lastName": "Mateo",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2020-08-13",
                  "link": "/api/v1/people/622761",
                  "nameFirstLast": "Jorge Mateo",
                  "primaryPosition": {
                    "code": "6",
                    "name": "Shortstop",
                    "type": "Infielder",
                    "abbreviation": "SS"
                  },
                  "currentAge": 28,
                  "firstLastName": "Jorge Mateo",
                  "lastFirstName": "Mateo, Jorge",
                  "birthCountry": "Dominican Republic",
                  "useName": "Jorge",
                  "id": 622761,
                  "fullFMLName": "Jorge Luis Mateo",
                  "height": "6' 1\"",
                  "nameSlug": "jorge-mateo-622761",
                  "pronunciation": "ma-TAY-oh",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Mateo",
                  "fullName": "Jorge Mateo",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Santo Domingo Oeste",
                  "initLastName": "J Mateo",
                  "strikeZoneTop": 3.38,
                  "birthDate": "1995-06-23",
                  "primaryNumber": "3",
                  "firstName": "Jorge",
                  "fullLFMName": "Mateo, Jorge Luis",
                  "useLastName": "Mateo",
                  "middleName": "Luis",
                  "strikeZoneBottom": 1.62,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID683002": {
                  "isPlayer": true,
                  "lastInitName": "Henderson, G",
                  "lastName": "Henderson",
                  "birthStateProvince": "AL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-08-31",
                  "link": "/api/v1/people/683002",
                  "nameFirstLast": "Gunnar Henderson",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 22,
                  "firstLastName": "Gunnar Henderson",
                  "lastFirstName": "Henderson, Gunnar",
                  "birthCountry": "USA",
                  "useName": "Gunnar",
                  "id": 683002,
                  "fullFMLName": "Gunnar Randal Henderson",
                  "height": "6' 3\"",
                  "nameSlug": "gunnar-henderson-683002",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Henderson",
                  "fullName": "Gunnar Henderson",
                  "weight": 220,
                  "active": true,
                  "birthCity": "Montgomery",
                  "initLastName": "G Henderson",
                  "strikeZoneTop": 3.69,
                  "birthDate": "2001-06-29",
                  "primaryNumber": "2",
                  "firstName": "Gunnar",
                  "fullLFMName": "Henderson, Gunnar Randal",
                  "useLastName": "Henderson",
                  "middleName": "Randal",
                  "strikeZoneBottom": 1.73,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID572138": {
                  "isPlayer": true,
                  "lastInitName": "Singleton, J",
                  "lastName": "Singleton",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-06-03",
                  "link": "/api/v1/people/572138",
                  "nameFirstLast": "Jon Singleton",
                  "primaryPosition": {
                    "code": "3",
                    "name": "First Base",
                    "type": "Infielder",
                    "abbreviation": "1B"
                  },
                  "currentAge": 32,
                  "firstLastName": "Jon Singleton",
                  "lastFirstName": "Singleton, Jon",
                  "birthCountry": "USA",
                  "useName": "Jon",
                  "id": 572138,
                  "fullFMLName": "Jonathan L. Singleton",
                  "height": "6' 0\"",
                  "nameSlug": "jon-singleton-572138",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2009,
                  "boxscoreName": "Singleton",
                  "fullName": "Jon Singleton",
                  "weight": 256,
                  "active": true,
                  "birthCity": "Harbor City",
                  "initLastName": "J Singleton",
                  "strikeZoneTop": 3.12,
                  "birthDate": "1991-09-18",
                  "primaryNumber": "28",
                  "firstName": "Jonathan",
                  "fullLFMName": "Singleton, Jonathan L.",
                  "useLastName": "Singleton",
                  "middleName": "L.",
                  "strikeZoneBottom": 1.48,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID663630": {
                  "isPlayer": true,
                  "lastInitName": "McKenna, R",
                  "lastName": "McKenna",
                  "birthStateProvince": "OR",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2021-04-05",
                  "link": "/api/v1/people/663630",
                  "nameFirstLast": "Ryan McKenna",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 26,
                  "firstLastName": "Ryan McKenna",
                  "lastFirstName": "McKenna, Ryan",
                  "birthCountry": "USA",
                  "useName": "Ryan",
                  "id": 663630,
                  "fullFMLName": "Ryan Shea McKenna",
                  "height": "5' 11\"",
                  "nameSlug": "ryan-mckenna-663630",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2015,
                  "boxscoreName": "McKenna",
                  "fullName": "Ryan McKenna",
                  "weight": 195,
                  "active": true,
                  "birthCity": "Grants Pass",
                  "initLastName": "R McKenna",
                  "strikeZoneTop": 3.4,
                  "birthDate": "1997-02-14",
                  "primaryNumber": "26",
                  "firstName": "Ryan",
                  "fullLFMName": "McKenna, Ryan Shea",
                  "useLastName": "McKenna",
                  "middleName": "Shea",
                  "strikeZoneBottom": 1.61,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID680694": {
                  "isPlayer": true,
                  "lastInitName": "Bradish, K",
                  "lastName": "Bradish",
                  "birthStateProvince": "AZ",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-04-29",
                  "link": "/api/v1/people/680694",
                  "nameFirstLast": "Kyle Bradish",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Kyle Bradish",
                  "lastFirstName": "Bradish, Kyle",
                  "birthCountry": "USA",
                  "useName": "Kyle",
                  "id": 680694,
                  "fullFMLName": "Kyle Edward Bradish",
                  "height": "6' 3\"",
                  "nameSlug": "kyle-bradish-680694",
                  "pronunciation": "BRAD-ish",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Bradish",
                  "fullName": "Kyle Bradish",
                  "weight": 215,
                  "active": true,
                  "birthCity": "Peoria",
                  "initLastName": "K Bradish",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1996-09-12",
                  "primaryNumber": "39",
                  "firstName": "Kyle",
                  "fullLFMName": "Bradish, Kyle Edward",
                  "useLastName": "Bradish",
                  "middleName": "Edward",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID608665": {
                  "isPlayer": true,
                  "lastInitName": "Graveman, K",
                  "lastName": "Graveman",
                  "birthStateProvince": "AL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-09-05",
                  "link": "/api/v1/people/608665",
                  "nameFirstLast": "Kendall Graveman",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 32,
                  "firstLastName": "Kendall Graveman",
                  "lastFirstName": "Graveman, Kendall",
                  "birthCountry": "USA",
                  "useName": "Kendall",
                  "id": 608665,
                  "fullFMLName": "Kendall Chase Graveman",
                  "height": "6' 2\"",
                  "nameSlug": "kendall-graveman-608665",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Digger",
                  "draftYear": 2013,
                  "boxscoreName": "Graveman",
                  "fullName": "Kendall Graveman",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Alexander City",
                  "initLastName": "K Graveman",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1990-12-21",
                  "primaryNumber": "31",
                  "firstName": "Kendall",
                  "fullLFMName": "Graveman, Kendall Chase",
                  "useLastName": "Graveman",
                  "middleName": "Chase",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID680570": {
                  "isPlayer": true,
                  "lastInitName": "Rodriguez, G",
                  "lastName": "Rodriguez",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-04-05",
                  "link": "/api/v1/people/680570",
                  "nameFirstLast": "Grayson Rodriguez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 23,
                  "firstLastName": "Grayson Rodriguez",
                  "lastFirstName": "Rodriguez, Grayson",
                  "birthCountry": "USA",
                  "useName": "Grayson",
                  "id": 680570,
                  "fullFMLName": "Grayson Greer Rodriguez",
                  "height": "6' 5\"",
                  "nameSlug": "grayson-rodriguez-680570",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Rodriguez, G",
                  "fullName": "Grayson Rodriguez",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Houston",
                  "initLastName": "G Rodriguez",
                  "strikeZoneTop": 3.575,
                  "birthDate": "1999-11-16",
                  "primaryNumber": "30",
                  "firstName": "Grayson",
                  "fullLFMName": "Rodriguez, Grayson Greer",
                  "useLastName": "Rodriguez",
                  "middleName": "Greer",
                  "strikeZoneBottom": 1.681,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID547989": {
                  "isPlayer": true,
                  "lastInitName": "Abreu, J",
                  "lastName": "Abreu",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-03-31",
                  "link": "/api/v1/people/547989",
                  "nameFirstLast": "Jose Abreu",
                  "primaryPosition": {
                    "code": "3",
                    "name": "First Base",
                    "type": "Infielder",
                    "abbreviation": "1B"
                  },
                  "currentAge": 36,
                  "firstLastName": "José Abreu",
                  "lastFirstName": "Abreu, José",
                  "birthCountry": "Cuba",
                  "useName": "Jose",
                  "id": 547989,
                  "fullFMLName": "José Dariel Abreu",
                  "height": "6' 3\"",
                  "nameMatrilineal": "Correa",
                  "nameSlug": "jose-abreu-547989",
                  "pronunciation": "uh-BRAY-you",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Mal Tiempo",
                  "boxscoreName": "Abreu, J",
                  "fullName": "Jose Abreu",
                  "weight": 235,
                  "active": true,
                  "birthCity": "Cienfuegos",
                  "initLastName": "J Abreu",
                  "strikeZoneTop": 3.35,
                  "birthDate": "1987-01-29",
                  "primaryNumber": "79",
                  "firstName": "Jose",
                  "fullLFMName": "Abreu, José Dariel",
                  "useLastName": "Abreu",
                  "middleName": "Dariel",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID677008": {
                  "isPlayer": true,
                  "lastInitName": "Kjerstad, H",
                  "lastName": "Kjerstad",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-09-14",
                  "link": "/api/v1/people/677008",
                  "nameFirstLast": "Heston Kjerstad",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 24,
                  "firstLastName": "Heston Kjerstad",
                  "lastFirstName": "Kjerstad, Heston",
                  "birthCountry": "USA",
                  "useName": "Heston",
                  "id": 677008,
                  "fullFMLName": "Heston Sawyer Kjerstad",
                  "height": "6' 3\"",
                  "nameSlug": "heston-kjerstad-677008",
                  "pronunciation": "kerr-stad",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2020,
                  "boxscoreName": "Kjerstad",
                  "fullName": "Heston Kjerstad",
                  "weight": 205,
                  "active": true,
                  "birthCity": "Amarillo",
                  "initLastName": "H Kjerstad",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1999-02-12",
                  "primaryNumber": "13",
                  "firstName": "Heston",
                  "fullLFMName": "Kjerstad, Heston Sawyer",
                  "useLastName": "Kjerstad",
                  "middleName": "Sawyer",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID656427": {
                  "isPlayer": true,
                  "lastInitName": "Flaherty, J",
                  "lastName": "Flaherty",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-09-01",
                  "link": "/api/v1/people/656427",
                  "nameFirstLast": "Jack Flaherty",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Jack Flaherty",
                  "lastFirstName": "Flaherty, Jack",
                  "birthCountry": "USA",
                  "useName": "Jack",
                  "id": 656427,
                  "fullFMLName": "Jack Rafe Flaherty",
                  "height": "6' 4\"",
                  "nameSlug": "jack-flaherty-656427",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Flare",
                  "draftYear": 2014,
                  "boxscoreName": "Flaherty",
                  "fullName": "Jack Flaherty",
                  "weight": 225,
                  "active": true,
                  "birthCity": "Burbank",
                  "initLastName": "J Flaherty",
                  "strikeZoneTop": 3.48,
                  "birthDate": "1995-10-15",
                  "primaryNumber": "15",
                  "firstName": "Jack",
                  "fullLFMName": "Flaherty, Jack Rafe",
                  "useLastName": "Flaherty",
                  "middleName": "Rafe",
                  "strikeZoneBottom": 1.62,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID543305": {
                  "isPlayer": true,
                  "lastInitName": "Hicks, A",
                  "lastName": "Hicks",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-04-01",
                  "link": "/api/v1/people/543305",
                  "nameFirstLast": "Aaron Hicks",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 33,
                  "firstLastName": "Aaron Hicks",
                  "lastFirstName": "Hicks, Aaron",
                  "birthCountry": "USA",
                  "useName": "Aaron",
                  "id": 543305,
                  "fullFMLName": "Aaron Michael Hicks",
                  "height": "6' 1\"",
                  "nameSlug": "aaron-hicks-543305",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Hicksie",
                  "draftYear": 2008,
                  "boxscoreName": "Hicks, A",
                  "fullName": "Aaron Hicks",
                  "weight": 205,
                  "active": true,
                  "birthCity": "San Pedro",
                  "initLastName": "A Hicks",
                  "strikeZoneTop": 3.63,
                  "birthDate": "1989-10-02",
                  "primaryNumber": "34",
                  "firstName": "Aaron",
                  "fullLFMName": "Hicks, Aaron Michael",
                  "useLastName": "Hicks",
                  "middleName": "Michael",
                  "strikeZoneBottom": 1.76,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID656986": {
                  "isPlayer": true,
                  "lastInitName": "Sousa, B",
                  "lastName": "Sousa",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-04-08",
                  "link": "/api/v1/people/656986",
                  "nameFirstLast": "Bennett Sousa",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "Bennett Sousa",
                  "lastFirstName": "Sousa, Bennett",
                  "birthCountry": "USA",
                  "useName": "Bennett",
                  "id": 656986,
                  "fullFMLName": "John Bennett Sousa",
                  "height": "6' 3\"",
                  "nameSlug": "bennett-sousa-656986",
                  "pronunciation": "SUE-zuh",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Sousa",
                  "fullName": "Bennett Sousa",
                  "weight": 220,
                  "active": true,
                  "birthCity": "North Palm Beach",
                  "initLastName": "B Sousa",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1995-04-06",
                  "primaryNumber": "62",
                  "firstName": "John",
                  "fullLFMName": "Sousa, John Bennett",
                  "useLastName": "Sousa",
                  "middleName": "Bennett",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID666197": {
                  "isPlayer": true,
                  "lastInitName": "Kessinger, G",
                  "lastName": "Kessinger",
                  "birthStateProvince": "MS",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2023-06-07",
                  "link": "/api/v1/people/666197",
                  "nameFirstLast": "Grae Kessinger",
                  "primaryPosition": {
                    "code": "6",
                    "name": "Shortstop",
                    "type": "Infielder",
                    "abbreviation": "SS"
                  },
                  "currentAge": 26,
                  "firstLastName": "Grae Kessinger",
                  "lastFirstName": "Kessinger, Grae",
                  "birthCountry": "USA",
                  "useName": "Grae",
                  "id": 666197,
                  "fullFMLName": "Graeber Crawley Kessinger",
                  "height": "6' 1\"",
                  "nameSlug": "grae-kessinger-666197",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Kessinger",
                  "fullName": "Grae Kessinger",
                  "weight": 204,
                  "active": true,
                  "birthCity": "Oxford",
                  "initLastName": "G Kessinger",
                  "strikeZoneTop": 3.26,
                  "birthDate": "1997-08-25",
                  "primaryNumber": "16",
                  "firstName": "Graeber",
                  "fullLFMName": "Kessinger, Graeber Crawley",
                  "useLastName": "Kessinger",
                  "middleName": "Crawley",
                  "strikeZoneBottom": 1.54,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID602104": {
                  "isPlayer": true,
                  "lastInitName": "Urías, R",
                  "lastName": "Urias",
                  "birthStateProvince": "SO",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2020-08-20",
                  "link": "/api/v1/people/602104",
                  "nameFirstLast": "Ramon Urias",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 29,
                  "firstLastName": "Ramón Urías",
                  "lastFirstName": "Urías, Ramón",
                  "birthCountry": "Mexico",
                  "useName": "Ramon",
                  "id": 602104,
                  "fullFMLName": "Ramón Francisco Urías",
                  "height": "5' 10\"",
                  "nameMatrilineal": "Figueroa",
                  "nameSlug": "ramon-urias-602104",
                  "pronunciation": "Uoo-REE-ahs",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Urías, R",
                  "fullName": "Ramon Urias",
                  "weight": 185,
                  "active": true,
                  "birthCity": "Magdalena de Kino",
                  "initLastName": "R Urías",
                  "strikeZoneTop": 3.13,
                  "birthDate": "1994-06-03",
                  "primaryNumber": "29",
                  "firstName": "Ramon",
                  "fullLFMName": "Urías, Ramón Francisco",
                  "useLastName": "Urías",
                  "middleName": "Francisco",
                  "strikeZoneBottom": 1.48,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID488726": {
                  "isPlayer": true,
                  "lastInitName": "Brantley, M",
                  "lastName": "Brantley",
                  "birthStateProvince": "WA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2009-09-01",
                  "link": "/api/v1/people/488726",
                  "nameFirstLast": "Michael Brantley",
                  "nameSuffix": "Jr.",
                  "primaryPosition": {
                    "code": "10",
                    "name": "Designated Hitter",
                    "type": "Hitter",
                    "abbreviation": "DH"
                  },
                  "currentAge": 36,
                  "firstLastName": "Michael Brantley",
                  "lastFirstName": "Brantley, Michael",
                  "birthCountry": "USA",
                  "useName": "Michael",
                  "id": 488726,
                  "fullFMLName": "Michael Charles Brantley",
                  "height": "6' 2\"",
                  "nameSlug": "michael-brantley-488726",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Champ",
                  "draftYear": 2005,
                  "nameTitle": "Jr.",
                  "boxscoreName": "Brantley",
                  "fullName": "Michael Brantley",
                  "weight": 209,
                  "active": true,
                  "birthCity": "Bellevue",
                  "initLastName": "M Brantley",
                  "strikeZoneTop": 3.22,
                  "birthDate": "1987-05-15",
                  "primaryNumber": "23",
                  "firstName": "Michael",
                  "fullLFMName": "Brantley, Michael Charles",
                  "useLastName": "Brantley",
                  "middleName": "Charles",
                  "strikeZoneBottom": 1.46,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID664299": {
                  "isPlayer": true,
                  "lastInitName": "Javier, C",
                  "lastName": "Javier",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2020-07-25",
                  "link": "/api/v1/people/664299",
                  "nameFirstLast": "Cristian Javier",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 26,
                  "firstLastName": "Cristian Javier",
                  "lastFirstName": "Javier, Cristian",
                  "birthCountry": "Dominican Republic",
                  "useName": "Cristian",
                  "id": 664299,
                  "fullFMLName": "Cristian Javier",
                  "height": "6' 1\"",
                  "nameMatrilineal": "Mieses",
                  "nameSlug": "cristian-javier-664299",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Javier",
                  "fullName": "Cristian Javier",
                  "weight": 213,
                  "active": true,
                  "birthCity": "Santo Domingo",
                  "initLastName": "C Javier",
                  "strikeZoneTop": 3.411,
                  "birthDate": "1997-03-26",
                  "primaryNumber": "53",
                  "firstName": "Cristian",
                  "fullLFMName": "Javier, Cristian",
                  "useLastName": "Javier",
                  "strikeZoneBottom": 1.565,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID519151": {
                  "isPlayer": true,
                  "lastInitName": "Pressly, R",
                  "lastName": "Pressly",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-04-04",
                  "link": "/api/v1/people/519151",
                  "nameFirstLast": "Ryan Pressly",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 34,
                  "firstLastName": "Ryan Pressly",
                  "lastFirstName": "Pressly, Ryan",
                  "birthCountry": "USA",
                  "useName": "Ryan",
                  "id": 519151,
                  "fullFMLName": "Thomas Ryan Pressly",
                  "height": "6' 2\"",
                  "nameSlug": "ryan-pressly-519151",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Press",
                  "draftYear": 2007,
                  "boxscoreName": "Pressly",
                  "fullName": "Ryan Pressly",
                  "weight": 206,
                  "active": true,
                  "birthCity": "Dallas",
                  "initLastName": "R Pressly",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1988-12-15",
                  "primaryNumber": "55",
                  "firstName": "Thomas",
                  "fullLFMName": "Pressly, Thomas Ryan",
                  "useLastName": "Pressly",
                  "middleName": "Ryan",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID664208": {
                  "isPlayer": true,
                  "lastInitName": "Maton, P",
                  "lastName": "Maton",
                  "birthStateProvince": "KY",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-06-11",
                  "link": "/api/v1/people/664208",
                  "nameFirstLast": "Phil Maton",
                  "nameSuffix": "III",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "Phil Maton",
                  "lastFirstName": "Maton, Phil",
                  "birthCountry": "USA",
                  "useName": "Phil",
                  "id": 664208,
                  "fullFMLName": "Phillip Louis Maton",
                  "height": "6' 2\"",
                  "nameSlug": "phil-maton-664208",
                  "pronunciation": "MAY-tahn",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Spin Rate",
                  "draftYear": 2015,
                  "nameTitle": "III",
                  "boxscoreName": "Maton, P",
                  "fullName": "Phil Maton",
                  "weight": 206,
                  "active": true,
                  "birthCity": "Paducah",
                  "initLastName": "P Maton",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1993-03-25",
                  "primaryNumber": "88",
                  "firstName": "Phillip",
                  "fullLFMName": "Maton, Phillip Louis",
                  "useLastName": "Maton",
                  "middleName": "Louis",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID543510": {
                  "isPlayer": true,
                  "lastInitName": "McCann, J",
                  "lastName": "McCann",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-09-01",
                  "link": "/api/v1/people/543510",
                  "nameFirstLast": "James McCann",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 33,
                  "firstLastName": "James McCann",
                  "lastFirstName": "McCann, James",
                  "birthCountry": "USA",
                  "useName": "James",
                  "id": 543510,
                  "fullFMLName": "James Thomas McCann",
                  "height": "6' 3\"",
                  "nameSlug": "james-mccann-543510",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "McCannon",
                  "draftYear": 2011,
                  "boxscoreName": "McCann",
                  "fullName": "James McCann",
                  "weight": 235,
                  "active": true,
                  "birthCity": "Santa Barbara",
                  "initLastName": "J McCann",
                  "strikeZoneTop": 3.35,
                  "birthDate": "1990-06-13",
                  "primaryNumber": "27",
                  "firstName": "James",
                  "fullLFMName": "McCann, James Thomas",
                  "useLastName": "McCann",
                  "middleName": "Thomas",
                  "strikeZoneBottom": 1.49,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID502043": {
                  "isPlayer": true,
                  "lastInitName": "Gibson, K",
                  "lastName": "Gibson",
                  "birthStateProvince": "IN",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-06-29",
                  "link": "/api/v1/people/502043",
                  "nameFirstLast": "Kyle Gibson",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 35,
                  "firstLastName": "Kyle Gibson",
                  "lastFirstName": "Gibson, Kyle",
                  "birthCountry": "USA",
                  "useName": "Kyle",
                  "id": 502043,
                  "fullFMLName": "Kyle Benjamin Gibson",
                  "height": "6' 6\"",
                  "nameSlug": "kyle-gibson-502043",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Gibby",
                  "draftYear": 2009,
                  "boxscoreName": "Gibson",
                  "fullName": "Kyle Gibson",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Greenfield",
                  "initLastName": "K Gibson",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1987-10-23",
                  "primaryNumber": "48",
                  "firstName": "Kyle",
                  "fullLFMName": "Gibson, Kyle Benjamin",
                  "useLastName": "Gibson",
                  "middleName": "Benjamin",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID673237": {
                  "isPlayer": true,
                  "lastInitName": "Diaz, Y",
                  "lastName": "Diaz",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-09-02",
                  "link": "/api/v1/people/673237",
                  "nameFirstLast": "Yainer Diaz",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 25,
                  "firstLastName": "Yainer Diaz",
                  "lastFirstName": "Diaz, Yainer",
                  "birthCountry": "Dominican Republic",
                  "useName": "Yainer",
                  "id": 673237,
                  "fullFMLName": "Yainer Radhames Diaz",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Lopez",
                  "nameSlug": "yainer-diaz-673237",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Diaz, Y",
                  "fullName": "Yainer Diaz",
                  "weight": 195,
                  "active": true,
                  "birthCity": "Azua",
                  "initLastName": "Y Diaz",
                  "strikeZoneTop": 3.17,
                  "birthDate": "1998-09-21",
                  "primaryNumber": "21",
                  "firstName": "Yainer",
                  "fullLFMName": "Diaz, Yainer Radhames",
                  "useLastName": "Diaz",
                  "middleName": "Radhames",
                  "strikeZoneBottom": 1.45,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID665152": {
                  "isPlayer": true,
                  "lastInitName": "Kremer, D",
                  "lastName": "Kremer",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2020-09-06",
                  "link": "/api/v1/people/665152",
                  "nameFirstLast": "Dean Kremer",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Dean Kremer",
                  "lastFirstName": "Kremer, Dean",
                  "birthCountry": "USA",
                  "useName": "Dean",
                  "id": 665152,
                  "fullFMLName": "Dean Junior Kremer",
                  "height": "6' 2\"",
                  "nameSlug": "dean-kremer-665152",
                  "pronunciation": "KRAY-mer",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2016,
                  "boxscoreName": "Kremer",
                  "fullName": "Dean Kremer",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Stockton",
                  "initLastName": "D Kremer",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1996-01-07",
                  "primaryNumber": "64",
                  "firstName": "Dean",
                  "fullLFMName": "Kremer, Dean Junior",
                  "useLastName": "Kremer",
                  "middleName": "Junior",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID593576": {
                  "isPlayer": true,
                  "lastInitName": "Neris, H",
                  "lastName": "Neris",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-08-05",
                  "link": "/api/v1/people/593576",
                  "nameFirstLast": "Hector Neris",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 34,
                  "firstLastName": "Hector Neris",
                  "lastFirstName": "Neris, Hector",
                  "birthCountry": "Dominican Republic",
                  "useName": "Hector",
                  "id": 593576,
                  "fullFMLName": "Hector Neris",
                  "height": "6' 2\"",
                  "nameSlug": "hector-neris-593576",
                  "pronunciation": "HEHK-ter NAIR-iss",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Compa N",
                  "boxscoreName": "Neris",
                  "fullName": "Hector Neris",
                  "weight": 227,
                  "active": true,
                  "birthCity": "Villa Altagracia",
                  "initLastName": "H Neris",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1989-06-14",
                  "primaryNumber": "50",
                  "firstName": "Hector",
                  "fullLFMName": "Neris, Hector ",
                  "useLastName": "Neris",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID660261": {
                  "isPlayer": true,
                  "lastInitName": "Fujinami, S",
                  "lastName": "Fujinami",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-04-01",
                  "link": "/api/v1/people/660261",
                  "nameFirstLast": "Shintaro Fujinami",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Shintaro Fujinami",
                  "lastFirstName": "Fujinami, Shintaro",
                  "birthCountry": "Japan",
                  "useName": "Shintaro",
                  "id": 660261,
                  "fullFMLName": "Shintaro Fujinami",
                  "height": "6' 6\"",
                  "nameSlug": "shintaro-fujinami-660261",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Fujinami",
                  "fullName": "Shintaro Fujinami",
                  "weight": 180,
                  "active": true,
                  "birthCity": "Sakai",
                  "initLastName": "S Fujinami",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1994-04-12",
                  "primaryNumber": "14",
                  "firstName": "Shintaro",
                  "fullLFMName": "Fujinami, Shintaro",
                  "useLastName": "Fujinami",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID663656": {
                  "isPlayer": true,
                  "lastInitName": "Tucker, K",
                  "lastName": "Tucker",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-07-07",
                  "link": "/api/v1/people/663656",
                  "nameFirstLast": "Kyle Tucker",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 26,
                  "firstLastName": "Kyle Tucker",
                  "lastFirstName": "Tucker, Kyle",
                  "birthCountry": "USA",
                  "useName": "Kyle",
                  "id": 663656,
                  "fullFMLName": "Kyle Daniel Tucker",
                  "height": "6' 4\"",
                  "nameSlug": "kyle-tucker-663656",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2015,
                  "boxscoreName": "Tucker",
                  "fullName": "Kyle Tucker",
                  "weight": 199,
                  "active": true,
                  "birthCity": "Tampa",
                  "initLastName": "K Tucker",
                  "strikeZoneTop": 3.51,
                  "birthDate": "1997-01-17",
                  "primaryNumber": "30",
                  "firstName": "Kyle",
                  "fullLFMName": "Tucker, Kyle Daniel",
                  "useLastName": "Tucker",
                  "middleName": "Daniel",
                  "strikeZoneBottom": 1.69,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID623993": {
                  "isPlayer": true,
                  "lastInitName": "Santander, A",
                  "lastName": "Santander",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-08-18",
                  "link": "/api/v1/people/623993",
                  "nameFirstLast": "Anthony Santander",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Anthony Santander",
                  "lastFirstName": "Santander, Anthony",
                  "birthCountry": "Venezuela",
                  "useName": "Anthony",
                  "id": 623993,
                  "fullFMLName": "Anthony Roger Santander",
                  "height": "6' 2\"",
                  "nameSlug": "anthony-santander-623993",
                  "pronunciation": "SAHN-tahn-dare",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Agua Blanca",
                  "boxscoreName": "Santander",
                  "fullName": "Anthony Santander",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Margarita",
                  "initLastName": "A Santander",
                  "strikeZoneTop": 3.4,
                  "birthDate": "1994-10-19",
                  "primaryNumber": "25",
                  "firstName": "Anthony",
                  "fullLFMName": "Santander, Anthony Roger",
                  "useLastName": "Santander",
                  "middleName": "Roger",
                  "strikeZoneBottom": 1.63,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID641585": {
                  "isPlayer": true,
                  "lastInitName": "France, J",
                  "lastName": "France",
                  "birthStateProvince": "LA",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-05-06",
                  "link": "/api/v1/people/641585",
                  "nameFirstLast": "J.P. France",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "J.P. France",
                  "lastFirstName": "France, J.P.",
                  "birthCountry": "USA",
                  "useName": "J.P.",
                  "id": 641585,
                  "fullFMLName": "Jonathan Patrick France",
                  "height": "6' 0\"",
                  "nameSlug": "j-p-france-641585",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "France, J",
                  "fullName": "J.P. France",
                  "weight": 216,
                  "active": true,
                  "birthCity": "New Orleans",
                  "initLastName": "J France",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1995-04-04",
                  "primaryNumber": "68",
                  "firstName": "Jonathan",
                  "fullLFMName": "France, Jonathan Patrick",
                  "useLastName": "France",
                  "middleName": "Patrick",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID643289": {
                  "isPlayer": true,
                  "lastInitName": "Dubón, M",
                  "lastName": "Dubon",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-07-07",
                  "link": "/api/v1/people/643289",
                  "nameFirstLast": "Mauricio Dubon",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 29,
                  "firstLastName": "Mauricio Dubón",
                  "lastFirstName": "Dubón, Mauricio",
                  "birthCountry": "Honduras",
                  "useName": "Mauricio",
                  "id": 643289,
                  "fullFMLName": "Mauricio Andre Dubón",
                  "height": "6' 0\"",
                  "nameSlug": "mauricio-dubon-643289",
                  "pronunciation": "do-BOHN",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2013,
                  "boxscoreName": "Dubón",
                  "fullName": "Mauricio Dubon",
                  "weight": 173,
                  "active": true,
                  "birthCity": "San Pedro Sula",
                  "initLastName": "M Dubón",
                  "strikeZoneTop": 3.25,
                  "birthDate": "1994-07-19",
                  "primaryNumber": "14",
                  "firstName": "Mauricio",
                  "fullLFMName": "Dubón, Mauricio Andre",
                  "useLastName": "Dubón",
                  "middleName": "Andre",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID686613": {
                  "isPlayer": true,
                  "lastInitName": "Brown, H",
                  "lastName": "Brown",
                  "birthStateProvince": "MI",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-09-05",
                  "link": "/api/v1/people/686613",
                  "nameFirstLast": "Hunter Brown",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 25,
                  "firstLastName": "Hunter Brown",
                  "lastFirstName": "Brown, Hunter",
                  "birthCountry": "USA",
                  "useName": "Hunter",
                  "id": 686613,
                  "fullFMLName": "Hunter Noah Brown",
                  "height": "6' 2\"",
                  "nameSlug": "hunter-brown-686613",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Brown, H",
                  "fullName": "Hunter Brown",
                  "weight": 212,
                  "active": true,
                  "birthCity": "Detroit",
                  "initLastName": "H Brown",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1998-08-29",
                  "primaryNumber": "58",
                  "firstName": "Hunter",
                  "fullLFMName": "Brown, Hunter Noah",
                  "useLastName": "Brown",
                  "middleName": "Noah",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID608324": {
                  "isPlayer": true,
                  "lastInitName": "Bregman, A",
                  "lastName": "Bregman",
                  "birthStateProvince": "NM",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2016-07-25",
                  "link": "/api/v1/people/608324",
                  "nameFirstLast": "Alex Bregman",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 29,
                  "firstLastName": "Alex Bregman",
                  "lastFirstName": "Bregman, Alex",
                  "birthCountry": "USA",
                  "useName": "Alex",
                  "id": 608324,
                  "fullFMLName": "Alexander David Bregman",
                  "height": "6' 0\"",
                  "nameSlug": "alex-bregman-608324",
                  "pronunciation": "BREGG-min",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "A-Breg",
                  "draftYear": 2015,
                  "boxscoreName": "Bregman",
                  "fullName": "Alex Bregman",
                  "weight": 192,
                  "active": true,
                  "birthCity": "Albuquerque",
                  "initLastName": "A Bregman",
                  "strikeZoneTop": 3.01,
                  "birthDate": "1994-03-30",
                  "primaryNumber": "2",
                  "firstName": "Alexander",
                  "fullLFMName": "Bregman, Alexander David",
                  "useLastName": "Bregman",
                  "middleName": "David",
                  "strikeZoneBottom": 1.46,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID668939": {
                  "isPlayer": true,
                  "lastInitName": "Rutschman, A",
                  "lastName": "Rutschman",
                  "birthStateProvince": "OR",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-05-21",
                  "link": "/api/v1/people/668939",
                  "nameFirstLast": "Adley Rutschman",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 25,
                  "firstLastName": "Adley Rutschman",
                  "lastFirstName": "Rutschman, Adley",
                  "birthCountry": "USA",
                  "useName": "Adley",
                  "id": 668939,
                  "fullFMLName": "Adley Stan Rutschman",
                  "height": "6' 2\"",
                  "nameSlug": "adley-rutschman-668939",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Rutschman",
                  "fullName": "Adley Rutschman",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Portland",
                  "initLastName": "A Rutschman",
                  "strikeZoneTop": 3.41,
                  "birthDate": "1998-02-06",
                  "primaryNumber": "35",
                  "firstName": "Adley",
                  "fullLFMName": "Rutschman, Adley Stan",
                  "useLastName": "Rutschman",
                  "middleName": "Stan",
                  "strikeZoneBottom": 1.68,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID676694": {
                  "isPlayer": true,
                  "lastInitName": "Meyers, J",
                  "lastName": "Meyers",
                  "birthStateProvince": "NE",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2021-08-01",
                  "link": "/api/v1/people/676694",
                  "nameFirstLast": "Jake Meyers",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 27,
                  "firstLastName": "Jake Meyers",
                  "lastFirstName": "Meyers, Jake",
                  "birthCountry": "USA",
                  "useName": "Jake",
                  "id": 676694,
                  "fullFMLName": "Jacob Berkshire Meyers",
                  "height": "6' 0\"",
                  "nameSlug": "jake-meyers-676694",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Meyers",
                  "fullName": "Jake Meyers",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Omaha",
                  "initLastName": "J Meyers",
                  "strikeZoneTop": 3.2,
                  "birthDate": "1996-06-18",
                  "primaryNumber": "6",
                  "firstName": "Jacob",
                  "fullLFMName": "Meyers, Jacob Berkshire",
                  "useLastName": "Meyers",
                  "middleName": "Berkshire",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID657097": {
                  "isPlayer": true,
                  "lastInitName": "Webb, J",
                  "lastName": "Webb",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-04-16",
                  "link": "/api/v1/people/657097",
                  "nameFirstLast": "Jacob Webb",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "Jacob Webb",
                  "lastFirstName": "Webb, Jacob",
                  "birthCountry": "USA",
                  "useName": "Jacob",
                  "id": 657097,
                  "fullFMLName": "Jacob Lawrence Webb",
                  "height": "6' 2\"",
                  "nameSlug": "jacob-webb-657097",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2014,
                  "boxscoreName": "Webb",
                  "fullName": "Jacob Webb",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Riverside",
                  "initLastName": "J Webb",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1993-08-15",
                  "primaryNumber": "66",
                  "firstName": "Jacob",
                  "fullLFMName": "Webb, Jacob Lawrence",
                  "useLastName": "Webb",
                  "middleName": "Lawrence",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID676059": {
                  "isPlayer": true,
                  "lastInitName": "Westburg, J",
                  "lastName": "Westburg",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2023-06-26",
                  "link": "/api/v1/people/676059",
                  "nameFirstLast": "Jordan Westburg",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 24,
                  "firstLastName": "Jordan Westburg",
                  "lastFirstName": "Westburg, Jordan",
                  "birthCountry": "USA",
                  "useName": "Jordan",
                  "id": 676059,
                  "fullFMLName": "Jordan Cole Westburg",
                  "height": "6' 2\"",
                  "nameSlug": "jordan-westburg-676059",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2020,
                  "boxscoreName": "Westburg",
                  "fullName": "Jordan Westburg",
                  "weight": 210,
                  "active": true,
                  "birthCity": "New Braunfels",
                  "initLastName": "J Westburg",
                  "strikeZoneTop": 3.42,
                  "birthDate": "1999-02-18",
                  "primaryNumber": "11",
                  "firstName": "Jordan",
                  "fullLFMName": "Westburg, Jordan Cole",
                  "useLastName": "Westburg",
                  "middleName": "Cole",
                  "strikeZoneBottom": 1.64,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID669270": {
                  "isPlayer": true,
                  "lastInitName": "Kuhnel, J",
                  "lastName": "Kuhnel",
                  "birthStateProvince": "NC",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2019-08-16",
                  "link": "/api/v1/people/669270",
                  "nameFirstLast": "Joel Kuhnel",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "Joel Kuhnel",
                  "lastFirstName": "Kuhnel, Joel",
                  "birthCountry": "USA",
                  "useName": "Joel",
                  "id": 669270,
                  "fullFMLName": "Joel Kenneth Kuhnel",
                  "height": "6' 5\"",
                  "nameSlug": "joel-kuhnel-669270",
                  "pronunciation": "COON-uhl",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2016,
                  "boxscoreName": "Kuhnel",
                  "fullName": "Joel Kuhnel",
                  "weight": 290,
                  "active": true,
                  "birthCity": "Goldsboro",
                  "initLastName": "J Kuhnel",
                  "strikeZoneTop": 3.575,
                  "birthDate": "1995-02-19",
                  "primaryNumber": "60",
                  "firstName": "Joel",
                  "fullLFMName": "Kuhnel, Joel Kenneth",
                  "useLastName": "Kuhnel",
                  "middleName": "Kenneth",
                  "strikeZoneBottom": 1.681,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID672335": {
                  "isPlayer": true,
                  "lastInitName": "Pérez, C",
                  "lastName": "Perez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-07-11",
                  "link": "/api/v1/people/672335",
                  "nameFirstLast": "Cionel Perez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Cionel Pérez",
                  "lastFirstName": "Pérez, Cionel",
                  "birthCountry": "Cuba",
                  "useName": "Cionel",
                  "id": 672335,
                  "fullFMLName": "Cionel Felix Pérez",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Viera",
                  "nameSlug": "cionel-perez-672335",
                  "pronunciation": "see-oh-NELL",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "boxscoreName": "Pérez, C",
                  "fullName": "Cionel Perez",
                  "weight": 175,
                  "active": true,
                  "birthCity": "La Habana",
                  "initLastName": "C Pérez",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1996-04-21",
                  "primaryNumber": "58",
                  "firstName": "Cionel",
                  "fullLFMName": "Pérez, Cionel Felix",
                  "useLastName": "Pérez",
                  "middleName": "Felix",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID669720": {
                  "isPlayer": true,
                  "lastInitName": "Hays, A",
                  "lastName": "Hays",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-09-07",
                  "link": "/api/v1/people/669720",
                  "nameFirstLast": "Austin Hays",
                  "primaryPosition": {
                    "code": "7",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "LF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Austin Hays",
                  "lastFirstName": "Hays, Austin",
                  "birthCountry": "USA",
                  "useName": "Austin",
                  "id": 669720,
                  "fullFMLName": "Austin Charles Bryan Hays",
                  "height": "5' 11\"",
                  "nameSlug": "austin-hays-669720",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2016,
                  "boxscoreName": "Hays",
                  "fullName": "Austin Hays",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Daytona Beach",
                  "initLastName": "A Hays",
                  "strikeZoneTop": 3.22,
                  "birthDate": "1995-07-05",
                  "primaryNumber": "21",
                  "firstName": "Austin",
                  "fullLFMName": "Hays, Austin Charles Bryan",
                  "useLastName": "Hays",
                  "middleName": "Charles Bryan",
                  "strikeZoneBottom": 1.48,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID514888": {
                  "isPlayer": true,
                  "lastInitName": "Altuve, J",
                  "lastName": "Altuve",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2011-07-20",
                  "link": "/api/v1/people/514888",
                  "nameFirstLast": "Jose Altuve",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 33,
                  "firstLastName": "Jose Altuve",
                  "lastFirstName": "Altuve, Jose",
                  "birthCountry": "Venezuela",
                  "useName": "Jose",
                  "id": 514888,
                  "fullFMLName": "Jose Carlos Altuve",
                  "height": "5' 6\"",
                  "nameSlug": "jose-altuve-514888",
                  "pronunciation": "al-TOO-vay",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Tuve",
                  "boxscoreName": "Altuve",
                  "fullName": "Jose Altuve",
                  "weight": 166,
                  "active": true,
                  "birthCity": "Maracay",
                  "initLastName": "J Altuve",
                  "strikeZoneTop": 2.82,
                  "birthDate": "1990-05-06",
                  "primaryNumber": "27",
                  "firstName": "Jose",
                  "fullLFMName": "Altuve, Jose Carlos",
                  "useLastName": "Altuve",
                  "middleName": "Carlos",
                  "strikeZoneBottom": 1.25,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID665161": {
                  "isPlayer": true,
                  "lastInitName": "Peña, J",
                  "lastName": "Pena",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-04-07",
                  "link": "/api/v1/people/665161",
                  "nameFirstLast": "Jeremy Pena",
                  "primaryPosition": {
                    "code": "6",
                    "name": "Shortstop",
                    "type": "Infielder",
                    "abbreviation": "SS"
                  },
                  "currentAge": 25,
                  "firstLastName": "Jeremy Peña",
                  "lastFirstName": "Peña, Jeremy",
                  "birthCountry": "Dominican Republic",
                  "useName": "Jeremy",
                  "id": 665161,
                  "fullFMLName": "Jeremy Joan Peña",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Pineyro",
                  "nameSlug": "jeremy-pena-665161",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "La Tormenta",
                  "draftYear": 2018,
                  "boxscoreName": "Peña",
                  "fullName": "Jeremy Pena",
                  "weight": 202,
                  "active": true,
                  "birthCity": "Santo Domingo",
                  "initLastName": "J Peña",
                  "strikeZoneTop": 3.57,
                  "birthDate": "1997-09-22",
                  "primaryNumber": "3",
                  "firstName": "Jeremy",
                  "fullLFMName": "Peña, Jeremy Joan",
                  "useLastName": "Peña",
                  "middleName": "Joan",
                  "strikeZoneBottom": 1.71,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID664353": {
                  "isPlayer": true,
                  "lastInitName": "Urquidy, J",
                  "lastName": "Urquidy",
                  "birthStateProvince": "Sinaloa",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-07-02",
                  "link": "/api/v1/people/664353",
                  "nameFirstLast": "Jose Urquidy",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "José Urquidy",
                  "lastFirstName": "Urquidy, José",
                  "birthCountry": "Mexico",
                  "useName": "Jose",
                  "id": 664353,
                  "fullFMLName": "José Luis Urquidy",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Hernandez",
                  "nameSlug": "jose-urquidy-664353",
                  "pronunciation": "ur-KEE-dee",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Urquidy",
                  "fullName": "Jose Urquidy",
                  "weight": 217,
                  "active": true,
                  "birthCity": "Mazatlan",
                  "initLastName": "J Urquidy",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1995-05-01",
                  "primaryNumber": "65",
                  "firstName": "Jose",
                  "fullLFMName": "Urquidy, José Luis",
                  "useLastName": "Urquidy",
                  "middleName": "Luis",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID666974": {
                  "isPlayer": true,
                  "lastInitName": "Cano, Y",
                  "lastName": "Cano",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-05-11",
                  "link": "/api/v1/people/666974",
                  "nameFirstLast": "Yennier Cano",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Yennier Cano",
                  "lastFirstName": "Cano, Yennier",
                  "birthCountry": "Cuba",
                  "useName": "Yennier",
                  "id": 666974,
                  "fullFMLName": "Yennier  Cano",
                  "height": "6' 4\"",
                  "nameMatrilineal": "Banes",
                  "nameSlug": "yennier-cano-666974",
                  "pronunciation": "yen-NEER",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Cano",
                  "fullName": "Yennier Cano",
                  "weight": 245,
                  "active": true,
                  "birthCity": "Havana",
                  "initLastName": "Y Cano",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1994-03-09",
                  "primaryNumber": "78",
                  "firstName": "Yennier",
                  "fullLFMName": "Cano, Yennier",
                  "useLastName": "Cano",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID607644": {
                  "isPlayer": true,
                  "lastInitName": "Means, J",
                  "lastName": "Means",
                  "birthStateProvince": "KS",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2018-09-26",
                  "link": "/api/v1/people/607644",
                  "nameFirstLast": "John Means",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "John Means",
                  "lastFirstName": "Means, John",
                  "birthCountry": "USA",
                  "useName": "John",
                  "id": 607644,
                  "fullFMLName": "John Alan Means",
                  "height": "6' 4\"",
                  "nameSlug": "john-means-607644",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Meansy",
                  "draftYear": 2014,
                  "boxscoreName": "Means",
                  "fullName": "John Means",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Olathe",
                  "initLastName": "J Means",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1993-04-24",
                  "primaryNumber": "47",
                  "firstName": "John",
                  "fullLFMName": "Means, John Alan",
                  "useLastName": "Means",
                  "middleName": "Alan",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID605347": {
                  "isPlayer": true,
                  "lastInitName": "López, J",
                  "lastName": "Lopez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2015-09-29",
                  "link": "/api/v1/people/605347",
                  "nameFirstLast": "Jorge Lopez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "Jorge López",
                  "lastFirstName": "López, Jorge",
                  "birthCountry": "Puerto Rico",
                  "useName": "Jorge",
                  "id": 605347,
                  "fullFMLName": "Jorge Yabiel López",
                  "height": "6' 3\"",
                  "nameMatrilineal": "Ramos",
                  "nameSlug": "jorge-lopez-605347",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "El Pichu",
                  "draftYear": 2011,
                  "boxscoreName": "López, Jo",
                  "fullName": "Jorge Lopez",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Caguas",
                  "initLastName": "J López",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1993-02-10",
                  "primaryNumber": "73",
                  "firstName": "Jorge",
                  "fullLFMName": "López, Jorge Yabiel",
                  "useLastName": "López",
                  "middleName": "Yabiel",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID669084": {
                  "isPlayer": true,
                  "lastInitName": "Hall, D",
                  "lastName": "Hall",
                  "birthStateProvince": "GA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-08-13",
                  "link": "/api/v1/people/669084",
                  "nameFirstLast": "DL Hall",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 25,
                  "firstLastName": "DL Hall",
                  "lastFirstName": "Hall, DL",
                  "birthCountry": "USA",
                  "useName": "DL",
                  "id": 669084,
                  "fullFMLName": "Dayton Lane Hall",
                  "height": "6' 2\"",
                  "nameSlug": "dl-hall-669084",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Hall, DL",
                  "fullName": "DL Hall",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Valdosta",
                  "initLastName": "D Hall",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1998-09-19",
                  "primaryNumber": "24",
                  "firstName": "Dayton",
                  "fullLFMName": "Hall, Dayton Lane",
                  "useLastName": "Hall",
                  "middleName": "Lane",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID434378": {
                  "isPlayer": true,
                  "lastInitName": "Verlander, J",
                  "lastName": "Verlander",
                  "birthStateProvince": "VA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2005-07-04",
                  "link": "/api/v1/people/434378",
                  "nameFirstLast": "Justin Verlander",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 40,
                  "firstLastName": "Justin Verlander",
                  "lastFirstName": "Verlander, Justin",
                  "birthCountry": "USA",
                  "useName": "Justin",
                  "id": 434378,
                  "fullFMLName": "Justin Brooks Verlander",
                  "height": "6' 5\"",
                  "nameSlug": "justin-verlander-434378",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "J V",
                  "draftYear": 2004,
                  "boxscoreName": "Verlander",
                  "fullName": "Justin Verlander",
                  "weight": 235,
                  "active": true,
                  "birthCity": "Manakin-Sabot",
                  "initLastName": "J Verlander",
                  "strikeZoneTop": 3.575,
                  "birthDate": "1983-02-20",
                  "primaryNumber": "35",
                  "firstName": "Justin",
                  "fullLFMName": "Verlander, Justin Brooks",
                  "useLastName": "Verlander",
                  "middleName": "Brooks",
                  "strikeZoneBottom": 1.681,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID543056": {
                  "isPlayer": true,
                  "lastInitName": "Coulombe, D",
                  "lastName": "Coulombe",
                  "birthStateProvince": "MO",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-09-16",
                  "link": "/api/v1/people/543056",
                  "nameFirstLast": "Danny Coulombe",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 33,
                  "firstLastName": "Danny Coulombe",
                  "lastFirstName": "Coulombe, Danny",
                  "birthCountry": "USA",
                  "useName": "Danny",
                  "id": 543056,
                  "fullFMLName": "Daniel Paul Coulombe",
                  "height": "5' 10\"",
                  "nameSlug": "danny-coulombe-543056",
                  "pronunciation": "KOO-lohm",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Frenchie",
                  "draftYear": 2012,
                  "boxscoreName": "Coulombe",
                  "fullName": "Danny Coulombe",
                  "weight": 190,
                  "active": true,
                  "birthCity": "St. Louis",
                  "initLastName": "D Coulombe",
                  "strikeZoneTop": 3.301,
                  "birthDate": "1989-10-26",
                  "primaryNumber": "54",
                  "firstName": "Daniel",
                  "fullLFMName": "Coulombe, Daniel Paul",
                  "useLastName": "Coulombe",
                  "middleName": "Paul",
                  "strikeZoneBottom": 1.504,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID656811": {
                  "isPlayer": true,
                  "lastInitName": "O'Hearn, R",
                  "lastName": "O'Hearn",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-07-31",
                  "link": "/api/v1/people/656811",
                  "nameFirstLast": "Ryan O'Hearn",
                  "primaryPosition": {
                    "code": "3",
                    "name": "First Base",
                    "type": "Infielder",
                    "abbreviation": "1B"
                  },
                  "currentAge": 30,
                  "firstLastName": "Ryan O'Hearn",
                  "lastFirstName": "O'Hearn, Ryan",
                  "birthCountry": "USA",
                  "useName": "Ryan",
                  "id": 656811,
                  "fullFMLName": "Ryan Patrick O'Hearn",
                  "height": "6' 3\"",
                  "nameSlug": "ryan-o-hearn-656811",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Brohearn",
                  "draftYear": 2014,
                  "boxscoreName": "O'Hearn",
                  "fullName": "Ryan O'Hearn",
                  "weight": 220,
                  "active": true,
                  "birthCity": "Dunedin",
                  "initLastName": "R O'Hearn",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1993-07-26",
                  "primaryNumber": "32",
                  "firstName": "Ryan",
                  "fullLFMName": "O'Hearn, Ryan Patrick",
                  "useLastName": "O'Hearn",
                  "middleName": "Patrick",
                  "strikeZoneBottom": 1.7,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID676801": {
                  "isPlayer": true,
                  "lastInitName": "McCormick, C",
                  "lastName": "McCormick",
                  "birthStateProvince": "PA",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2021-04-01",
                  "link": "/api/v1/people/676801",
                  "nameFirstLast": "Chas McCormick",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Chas McCormick",
                  "lastFirstName": "McCormick, Chas",
                  "birthCountry": "USA",
                  "useName": "Chas",
                  "id": 676801,
                  "fullFMLName": "Chas Kane McCormick",
                  "height": "6' 0\"",
                  "nameSlug": "chas-mccormick-676801",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "McCormick",
                  "fullName": "Chas McCormick",
                  "weight": 208,
                  "active": true,
                  "birthCity": "West Chester",
                  "initLastName": "C McCormick",
                  "strikeZoneTop": 3.26,
                  "birthDate": "1995-04-19",
                  "primaryNumber": "20",
                  "firstName": "Chas",
                  "fullLFMName": "McCormick, Chas Kane",
                  "useLastName": "McCormick",
                  "middleName": "Kane",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID656775": {
                  "isPlayer": true,
                  "lastInitName": "Mullins, C",
                  "lastName": "Mullins",
                  "birthStateProvince": "NC",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-08-10",
                  "link": "/api/v1/people/656775",
                  "nameFirstLast": "Cedric Mullins",
                  "nameSuffix": "II",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Cedric Mullins",
                  "lastFirstName": "Mullins, Cedric",
                  "birthCountry": "USA",
                  "useName": "Cedric",
                  "id": 656775,
                  "fullFMLName": "Boyce Cedric Mullins",
                  "height": "5' 9\"",
                  "nameSlug": "cedric-mullins-656775",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2015,
                  "nameTitle": "II",
                  "boxscoreName": "Mullins",
                  "fullName": "Cedric Mullins",
                  "weight": 175,
                  "active": true,
                  "birthCity": "Greensboro",
                  "initLastName": "C Mullins",
                  "strikeZoneTop": 3.35,
                  "birthDate": "1994-10-01",
                  "primaryNumber": "31",
                  "firstName": "Boyce",
                  "fullLFMName": "Mullins, Boyce Cedric",
                  "useLastName": "Mullins",
                  "middleName": "Cedric",
                  "strikeZoneBottom": 1.56,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID670541": {
                  "isPlayer": true,
                  "lastInitName": "Alvarez, Y",
                  "lastName": "Alvarez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-06-09",
                  "link": "/api/v1/people/670541",
                  "nameFirstLast": "Yordan Alvarez",
                  "primaryPosition": {
                    "code": "7",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "LF"
                  },
                  "currentAge": 26,
                  "firstLastName": "Yordan Alvarez",
                  "lastFirstName": "Alvarez, Yordan",
                  "birthCountry": "Cuba",
                  "useName": "Yordan",
                  "id": 670541,
                  "fullFMLName": "Yordan Ruben Alvarez",
                  "height": "6' 5\"",
                  "nameMatrilineal": "Cadogan",
                  "nameSlug": "yordan-alvarez-670541",
                  "pronunciation": "YOR-dahn",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Yordan",
                  "boxscoreName": "Alvarez, Y",
                  "fullName": "Yordan Alvarez",
                  "weight": 225,
                  "active": true,
                  "birthCity": "Las Tunas",
                  "initLastName": "Y Alvarez",
                  "strikeZoneTop": 3.51,
                  "birthDate": "1997-06-27",
                  "primaryNumber": "44",
                  "firstName": "Yordan",
                  "fullLFMName": "Alvarez, Yordan Ruben",
                  "useLastName": "Alvarez",
                  "middleName": "Ruben",
                  "strikeZoneBottom": 1.73,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                }
              },
              "probablePitchers": {
                "away": {
                  "link": "/api/v1/people/680694",
                  "fullName": "Kyle Bradish",
                  "id": 680694
                },
                "home": {
                  "link": "/api/v1/people/664299",
                  "fullName": "Cristian Javier",
                  "id": 664299
                }
              },
              "primaryDatacaster": {
                "link": "/api/v1/people/802252",
                "fullName": "August Mueller",
                "id": 802252
              },
              "gameInfo": {
                "firstPitch": "2023-09-20T18:12:00.000Z",
                "gameDurationMinutes": 176,
                "attendance": 36427
              },
              "flags": {
                "homeTeamNoHitter": false,
                "awayTeamPerfectGame": false,
                "awayTeamNoHitter": false,
                "perfectGame": false,
                "homeTeamPerfectGame": false,
                "noHitter": false
              },
              "alerts": [],
              "datetime": {
                "dateTime": "2023-09-20T18:10:00Z",
                "dayNight": "day",
                "ampm": "PM",
                "originalDate": "2023-09-20",
                "time": "1:10",
                "officialDate": "2023-09-20"
              },
              "review": {
                "away": {
                  "used": 1,
                  "remaining": 0
                },
                "hasChallenges": true,
                "home": {
                  "used": 0,
                  "remaining": 1
                }
              },
              "weather": {
                "condition": "Roof Closed",
                "temp": "73",
                "wind": "0 mph, None"
              },
              "moundVisits": {
                "away": {
                  "used": 2,
                  "remaining": 3
                },
                "home": {
                  "used": 1,
                  "remaining": 4
                }
              },
              "status": {
                "codedGameState": "F",
                "abstractGameCode": "F",
                "abstractGameState": "Final",
                "detailedState": "Final",
                "startTimeTBD": false,
                "statusCode": "F"
              },
              "officialVenue": {
                "link": "/api/v1/venues/2392",
                "id": 2392
              }
            },
            "finalData": {
              "winner": {
                "link": "/api/v1/people/519151",
                "fullName": "Ryan Pressly",
                "id": 519151
              },
              "loser": {
                "link": "/api/v1/people/543056",
                "fullName": "Danny Coulombe",
                "id": 543056
              }
            },
            "initialGameData": {
              "venue": {
                "name": "Minute Maid Park",
                "link": "/api/v1/venues/2392",
                "timeZone": {
                  "offset": -5,
                  "tz": "CDT",
                  "offsetAtGameTime": -5,
                  "id": "America/Chicago"
                },
                "active": true,
                "season": "2023",
                "location": {
                  "elevation": 45,
                  "country": "USA",
                  "city": "Houston",
                  "phone": "(713) 259-8000",
                  "address1": "501 Crawford Street",
                  "postalCode": "77002",
                  "defaultCoordinates": {
                    "latitude": 29.756967,
                    "longitude": -95.355509
                  },
                  "state": "Texas",
                  "azimuthAngle": 343,
                  "stateAbbrev": "TX"
                },
                "id": 2392,
                "fieldInfo": {
                  "turfType": "Grass",
                  "leftCenter": 362,
                  "leftLine": 315,
                  "rightCenter": 373,
                  "rightLine": 326,
                  "roofType": "Retractable",
                  "center": 409,
                  "capacity": 41000
                }
              },
              "game": {
                "doubleHeader": "N",
                "calendarEventID": "14-716508-2023-09-20",
                "gameNumber": 1,
                "season": "2023",
                "pk": 716508,
                "id": "2023/09/20/balmlb-houmlb-1",
                "tiebreaker": "N",
                "type": "R",
                "gamedayType": "P",
                "seasonDisplay": "2023"
              },
              "officialScorer": {
                "link": "/api/v1/people/431016",
                "fullName": "Rick Blount",
                "id": 431016
              },
              "teams": {
                "away": {
                  "teamName": "Orioles",
                  "venue": {
                    "name": "Oriole Park at Camden Yards",
                    "link": "/api/v1/venues/2",
                    "id": 2
                  },
                  "locationName": "Baltimore",
                  "firstYearOfPlay": "1901",
                  "league": {
                    "name": "American League",
                    "link": "/api/v1/league/103",
                    "id": 103
                  },
                  "clubName": "Orioles",
                  "link": "/api/v1/teams/110",
                  "teamCode": "bal",
                  "fileCode": "bal",
                  "active": true,
                  "allStarStatus": "N",
                  "springVenue": {
                    "link": "/api/v1/venues/2508",
                    "id": 2508
                  },
                  "abbreviation": "BAL",
                  "springLeague": {
                    "name": "Grapefruit League",
                    "link": "/api/v1/league/115",
                    "id": 115,
                    "abbreviation": "GL"
                  },
                  "division": {
                    "name": "American League East",
                    "link": "/api/v1/divisions/201",
                    "id": 201
                  },
                  "record": {
                    "divisionGamesBack": "-",
                    "wins": 95,
                    "conferenceGamesBack": "-",
                    "records": {},
                    "springLeagueGamesBack": "-",
                    "leagueGamesBack": "-",
                    "divisionLeader": false,
                    "losses": 57,
                    "wildCardGamesBack": "-",
                    "sportGamesBack": "-",
                    "leagueRecord": {
                      "wins": 95,
                      "pct": ".625",
                      "ties": 0,
                      "losses": 57
                    },
                    "gamesPlayed": 152,
                    "winningPercentage": ".625"
                  },
                  "name": "Baltimore Orioles",
                  "season": 2023,
                  "id": 110,
                  "shortName": "Baltimore",
                  "sport": {
                    "link": "/api/v1/sports/1",
                    "name": "Major League Baseball",
                    "id": 1
                  },
                  "franchiseName": "Baltimore"
                },
                "home": {
                  "teamName": "Astros",
                  "venue": {
                    "name": "Minute Maid Park",
                    "link": "/api/v1/venues/2392",
                    "id": 2392
                  },
                  "locationName": "Houston",
                  "firstYearOfPlay": "1962",
                  "league": {
                    "name": "American League",
                    "link": "/api/v1/league/103",
                    "id": 103
                  },
                  "clubName": "Astros",
                  "link": "/api/v1/teams/117",
                  "teamCode": "hou",
                  "fileCode": "hou",
                  "active": true,
                  "allStarStatus": "N",
                  "springVenue": {
                    "link": "/api/v1/venues/5000",
                    "id": 5000
                  },
                  "abbreviation": "HOU",
                  "springLeague": {
                    "name": "Grapefruit League",
                    "link": "/api/v1/league/115",
                    "id": 115,
                    "abbreviation": "GL"
                  },
                  "division": {
                    "name": "American League West",
                    "link": "/api/v1/divisions/200",
                    "id": 200
                  },
                  "record": {
                    "divisionGamesBack": "-",
                    "wins": 85,
                    "conferenceGamesBack": "-",
                    "records": {},
                    "springLeagueGamesBack": "-",
                    "leagueGamesBack": "-",
                    "divisionLeader": false,
                    "losses": 68,
                    "wildCardGamesBack": "-",
                    "sportGamesBack": "-",
                    "leagueRecord": {
                      "wins": 85,
                      "pct": ".556",
                      "ties": 0,
                      "losses": 68
                    },
                    "gamesPlayed": 153,
                    "winningPercentage": ".556"
                  },
                  "name": "Houston Astros",
                  "season": 2023,
                  "id": 117,
                  "shortName": "Houston",
                  "sport": {
                    "link": "/api/v1/sports/1",
                    "name": "Major League Baseball",
                    "id": 1
                  },
                  "franchiseName": "Houston"
                }
              },
              "players": {
                "ID624428": {
                  "isPlayer": true,
                  "lastInitName": "Frazier, A",
                  "lastName": "Frazier",
                  "birthStateProvince": "GA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2016-06-24",
                  "link": "/api/v1/people/624428",
                  "nameFirstLast": "Adam Frazier",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 31,
                  "firstLastName": "Adam Frazier",
                  "lastFirstName": "Frazier, Adam",
                  "birthCountry": "USA",
                  "useName": "Adam",
                  "id": 624428,
                  "fullFMLName": "Adam Timothy Frazier",
                  "height": "5' 10\"",
                  "nameSlug": "adam-frazier-624428",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Fraz",
                  "draftYear": 2013,
                  "boxscoreName": "Frazier",
                  "fullName": "Adam Frazier",
                  "weight": 180,
                  "active": true,
                  "birthCity": "Athens",
                  "initLastName": "A Frazier",
                  "strikeZoneTop": 3.18,
                  "birthDate": "1991-12-14",
                  "primaryNumber": "12",
                  "firstName": "Adam",
                  "fullLFMName": "Frazier, Adam Timothy",
                  "useLastName": "Frazier",
                  "middleName": "Timothy",
                  "strikeZoneBottom": 1.45,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID664285": {
                  "isPlayer": true,
                  "lastInitName": "Valdez, F",
                  "lastName": "Valdez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-08-21",
                  "link": "/api/v1/people/664285",
                  "nameFirstLast": "Framber Valdez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Framber Valdez",
                  "lastFirstName": "Valdez, Framber",
                  "birthCountry": "Dominican Republic",
                  "useName": "Framber",
                  "id": 664285,
                  "fullFMLName": "Framber Valdez",
                  "height": "5' 11\"",
                  "nameMatrilineal": "Pinales",
                  "nameSlug": "framber-valdez-664285",
                  "pronunciation": "FRAHM-burr",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "boxscoreName": "Valdez, F",
                  "fullName": "Framber Valdez",
                  "weight": 239,
                  "active": true,
                  "birthCity": "Palenque",
                  "initLastName": "F Valdez",
                  "strikeZoneTop": 3.319,
                  "birthDate": "1993-11-19",
                  "primaryNumber": "59",
                  "firstName": "Framber",
                  "fullLFMName": "Valdez, Framber",
                  "useLastName": "Valdez",
                  "strikeZoneBottom": 1.513,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID455117": {
                  "isPlayer": true,
                  "lastInitName": "Maldonado, M",
                  "lastName": "Maldonado",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2011-09-03",
                  "link": "/api/v1/people/455117",
                  "nameFirstLast": "Martin Maldonado",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 37,
                  "firstLastName": "Martín Maldonado",
                  "lastFirstName": "Maldonado, Martín",
                  "birthCountry": "Puerto Rico",
                  "useName": "Martin",
                  "id": 455117,
                  "fullFMLName": "Martín Maldonado",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Valdes",
                  "nameSlug": "martin-maldonado-455117",
                  "pronunciation": "Mar-TEEN",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Martincito",
                  "draftYear": 2004,
                  "boxscoreName": "Maldonado, M",
                  "fullName": "Martin Maldonado",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Naguabo",
                  "initLastName": "M Maldonado",
                  "strikeZoneTop": 3.13,
                  "birthDate": "1986-08-16",
                  "primaryNumber": "15",
                  "firstName": "Martin",
                  "fullLFMName": "Maldonado, Martín",
                  "useLastName": "Maldonado",
                  "strikeZoneBottom": 1.43,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID650556": {
                  "isPlayer": true,
                  "lastInitName": "Abreu, B",
                  "lastName": "Abreu",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-07-31",
                  "link": "/api/v1/people/650556",
                  "nameFirstLast": "Bryan Abreu",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 26,
                  "firstLastName": "Bryan Abreu",
                  "lastFirstName": "Abreu, Bryan",
                  "birthCountry": "Dominican Republic",
                  "useName": "Bryan",
                  "id": 650556,
                  "fullFMLName": "Bryan Enrique Abreu",
                  "height": "6' 1\"",
                  "nameMatrilineal": "Jimenez",
                  "nameSlug": "bryan-abreu-650556",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Abreu, B",
                  "fullName": "Bryan Abreu",
                  "weight": 225,
                  "active": true,
                  "birthCity": "Santo Domingo Centro",
                  "initLastName": "B Abreu",
                  "strikeZoneTop": 3.411,
                  "birthDate": "1997-04-22",
                  "primaryNumber": "52",
                  "firstName": "Bryan",
                  "fullLFMName": "Abreu, Bryan Enrique",
                  "useLastName": "Abreu",
                  "middleName": "Enrique",
                  "strikeZoneBottom": 1.565,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID657508": {
                  "isPlayer": true,
                  "lastInitName": "Baumann, M",
                  "lastName": "Baumann",
                  "birthStateProvince": "MN",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2021-09-07",
                  "link": "/api/v1/people/657508",
                  "nameFirstLast": "Mike Baumann",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "Mike Baumann",
                  "lastFirstName": "Baumann, Mike",
                  "birthCountry": "USA",
                  "useName": "Mike",
                  "id": 657508,
                  "fullFMLName": "Michael Thomas Baumann",
                  "height": "6' 4\"",
                  "nameSlug": "mike-baumann-657508",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Baumann",
                  "fullName": "Mike Baumann",
                  "weight": 240,
                  "active": true,
                  "birthCity": "Mahtomedi",
                  "initLastName": "M Baumann",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1995-09-10",
                  "primaryNumber": "53",
                  "firstName": "Michael",
                  "fullLFMName": "Baumann, Michael Thomas",
                  "useLastName": "Baumann",
                  "middleName": "Thomas",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID606160": {
                  "isPlayer": true,
                  "lastInitName": "Montero, R",
                  "lastName": "Montero",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-05-14",
                  "link": "/api/v1/people/606160",
                  "nameFirstLast": "Rafael Montero",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 32,
                  "firstLastName": "Rafael Montero",
                  "lastFirstName": "Montero, Rafael",
                  "birthCountry": "Dominican Republic",
                  "useName": "Rafael",
                  "id": 606160,
                  "fullFMLName": "Rafael Montero",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Quezada",
                  "nameSlug": "rafael-montero-606160",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Monte",
                  "boxscoreName": "Montero",
                  "fullName": "Rafael Montero",
                  "weight": 190,
                  "active": true,
                  "birthCity": "Higuerito",
                  "initLastName": "R Montero",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1990-10-17",
                  "primaryNumber": "47",
                  "firstName": "Rafael",
                  "fullLFMName": "Montero, Rafael",
                  "useLastName": "Montero",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID622761": {
                  "isPlayer": true,
                  "lastInitName": "Mateo, J",
                  "lastName": "Mateo",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2020-08-13",
                  "link": "/api/v1/people/622761",
                  "nameFirstLast": "Jorge Mateo",
                  "primaryPosition": {
                    "code": "6",
                    "name": "Shortstop",
                    "type": "Infielder",
                    "abbreviation": "SS"
                  },
                  "currentAge": 28,
                  "firstLastName": "Jorge Mateo",
                  "lastFirstName": "Mateo, Jorge",
                  "birthCountry": "Dominican Republic",
                  "useName": "Jorge",
                  "id": 622761,
                  "fullFMLName": "Jorge Luis Mateo",
                  "height": "6' 1\"",
                  "nameSlug": "jorge-mateo-622761",
                  "pronunciation": "ma-TAY-oh",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Mateo",
                  "fullName": "Jorge Mateo",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Santo Domingo Oeste",
                  "initLastName": "J Mateo",
                  "strikeZoneTop": 3.38,
                  "birthDate": "1995-06-23",
                  "primaryNumber": "3",
                  "firstName": "Jorge",
                  "fullLFMName": "Mateo, Jorge Luis",
                  "useLastName": "Mateo",
                  "middleName": "Luis",
                  "strikeZoneBottom": 1.62,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID683002": {
                  "isPlayer": true,
                  "lastInitName": "Henderson, G",
                  "lastName": "Henderson",
                  "birthStateProvince": "AL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-08-31",
                  "link": "/api/v1/people/683002",
                  "nameFirstLast": "Gunnar Henderson",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 22,
                  "firstLastName": "Gunnar Henderson",
                  "lastFirstName": "Henderson, Gunnar",
                  "birthCountry": "USA",
                  "useName": "Gunnar",
                  "id": 683002,
                  "fullFMLName": "Gunnar Randal Henderson",
                  "height": "6' 3\"",
                  "nameSlug": "gunnar-henderson-683002",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Henderson",
                  "fullName": "Gunnar Henderson",
                  "weight": 220,
                  "active": true,
                  "birthCity": "Montgomery",
                  "initLastName": "G Henderson",
                  "strikeZoneTop": 3.69,
                  "birthDate": "2001-06-29",
                  "primaryNumber": "2",
                  "firstName": "Gunnar",
                  "fullLFMName": "Henderson, Gunnar Randal",
                  "useLastName": "Henderson",
                  "middleName": "Randal",
                  "strikeZoneBottom": 1.73,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID572138": {
                  "isPlayer": true,
                  "lastInitName": "Singleton, J",
                  "lastName": "Singleton",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-06-03",
                  "link": "/api/v1/people/572138",
                  "nameFirstLast": "Jon Singleton",
                  "primaryPosition": {
                    "code": "3",
                    "name": "First Base",
                    "type": "Infielder",
                    "abbreviation": "1B"
                  },
                  "currentAge": 32,
                  "firstLastName": "Jon Singleton",
                  "lastFirstName": "Singleton, Jon",
                  "birthCountry": "USA",
                  "useName": "Jon",
                  "id": 572138,
                  "fullFMLName": "Jonathan L. Singleton",
                  "height": "6' 0\"",
                  "nameSlug": "jon-singleton-572138",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2009,
                  "boxscoreName": "Singleton",
                  "fullName": "Jon Singleton",
                  "weight": 256,
                  "active": true,
                  "birthCity": "Harbor City",
                  "initLastName": "J Singleton",
                  "strikeZoneTop": 3.12,
                  "birthDate": "1991-09-18",
                  "primaryNumber": "28",
                  "firstName": "Jonathan",
                  "fullLFMName": "Singleton, Jonathan L.",
                  "useLastName": "Singleton",
                  "middleName": "L.",
                  "strikeZoneBottom": 1.48,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID663630": {
                  "isPlayer": true,
                  "lastInitName": "McKenna, R",
                  "lastName": "McKenna",
                  "birthStateProvince": "OR",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2021-04-05",
                  "link": "/api/v1/people/663630",
                  "nameFirstLast": "Ryan McKenna",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 26,
                  "firstLastName": "Ryan McKenna",
                  "lastFirstName": "McKenna, Ryan",
                  "birthCountry": "USA",
                  "useName": "Ryan",
                  "id": 663630,
                  "fullFMLName": "Ryan Shea McKenna",
                  "height": "5' 11\"",
                  "nameSlug": "ryan-mckenna-663630",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2015,
                  "boxscoreName": "McKenna",
                  "fullName": "Ryan McKenna",
                  "weight": 195,
                  "active": true,
                  "birthCity": "Grants Pass",
                  "initLastName": "R McKenna",
                  "strikeZoneTop": 3.4,
                  "birthDate": "1997-02-14",
                  "primaryNumber": "26",
                  "firstName": "Ryan",
                  "fullLFMName": "McKenna, Ryan Shea",
                  "useLastName": "McKenna",
                  "middleName": "Shea",
                  "strikeZoneBottom": 1.61,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID680694": {
                  "isPlayer": true,
                  "lastInitName": "Bradish, K",
                  "lastName": "Bradish",
                  "birthStateProvince": "AZ",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-04-29",
                  "link": "/api/v1/people/680694",
                  "nameFirstLast": "Kyle Bradish",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Kyle Bradish",
                  "lastFirstName": "Bradish, Kyle",
                  "birthCountry": "USA",
                  "useName": "Kyle",
                  "id": 680694,
                  "fullFMLName": "Kyle Edward Bradish",
                  "height": "6' 3\"",
                  "nameSlug": "kyle-bradish-680694",
                  "pronunciation": "BRAD-ish",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Bradish",
                  "fullName": "Kyle Bradish",
                  "weight": 215,
                  "active": true,
                  "birthCity": "Peoria",
                  "initLastName": "K Bradish",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1996-09-12",
                  "primaryNumber": "39",
                  "firstName": "Kyle",
                  "fullLFMName": "Bradish, Kyle Edward",
                  "useLastName": "Bradish",
                  "middleName": "Edward",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID608665": {
                  "isPlayer": true,
                  "lastInitName": "Graveman, K",
                  "lastName": "Graveman",
                  "birthStateProvince": "AL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-09-05",
                  "link": "/api/v1/people/608665",
                  "nameFirstLast": "Kendall Graveman",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 32,
                  "firstLastName": "Kendall Graveman",
                  "lastFirstName": "Graveman, Kendall",
                  "birthCountry": "USA",
                  "useName": "Kendall",
                  "id": 608665,
                  "fullFMLName": "Kendall Chase Graveman",
                  "height": "6' 2\"",
                  "nameSlug": "kendall-graveman-608665",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Digger",
                  "draftYear": 2013,
                  "boxscoreName": "Graveman",
                  "fullName": "Kendall Graveman",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Alexander City",
                  "initLastName": "K Graveman",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1990-12-21",
                  "primaryNumber": "31",
                  "firstName": "Kendall",
                  "fullLFMName": "Graveman, Kendall Chase",
                  "useLastName": "Graveman",
                  "middleName": "Chase",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID680570": {
                  "isPlayer": true,
                  "lastInitName": "Rodriguez, G",
                  "lastName": "Rodriguez",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-04-05",
                  "link": "/api/v1/people/680570",
                  "nameFirstLast": "Grayson Rodriguez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 23,
                  "firstLastName": "Grayson Rodriguez",
                  "lastFirstName": "Rodriguez, Grayson",
                  "birthCountry": "USA",
                  "useName": "Grayson",
                  "id": 680570,
                  "fullFMLName": "Grayson Greer Rodriguez",
                  "height": "6' 5\"",
                  "nameSlug": "grayson-rodriguez-680570",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Rodriguez, G",
                  "fullName": "Grayson Rodriguez",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Houston",
                  "initLastName": "G Rodriguez",
                  "strikeZoneTop": 3.575,
                  "birthDate": "1999-11-16",
                  "primaryNumber": "30",
                  "firstName": "Grayson",
                  "fullLFMName": "Rodriguez, Grayson Greer",
                  "useLastName": "Rodriguez",
                  "middleName": "Greer",
                  "strikeZoneBottom": 1.681,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID547989": {
                  "isPlayer": true,
                  "lastInitName": "Abreu, J",
                  "lastName": "Abreu",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-03-31",
                  "link": "/api/v1/people/547989",
                  "nameFirstLast": "Jose Abreu",
                  "primaryPosition": {
                    "code": "3",
                    "name": "First Base",
                    "type": "Infielder",
                    "abbreviation": "1B"
                  },
                  "currentAge": 36,
                  "firstLastName": "José Abreu",
                  "lastFirstName": "Abreu, José",
                  "birthCountry": "Cuba",
                  "useName": "Jose",
                  "id": 547989,
                  "fullFMLName": "José Dariel Abreu",
                  "height": "6' 3\"",
                  "nameMatrilineal": "Correa",
                  "nameSlug": "jose-abreu-547989",
                  "pronunciation": "uh-BRAY-you",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Mal Tiempo",
                  "boxscoreName": "Abreu, J",
                  "fullName": "Jose Abreu",
                  "weight": 235,
                  "active": true,
                  "birthCity": "Cienfuegos",
                  "initLastName": "J Abreu",
                  "strikeZoneTop": 3.35,
                  "birthDate": "1987-01-29",
                  "primaryNumber": "79",
                  "firstName": "Jose",
                  "fullLFMName": "Abreu, José Dariel",
                  "useLastName": "Abreu",
                  "middleName": "Dariel",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID677008": {
                  "isPlayer": true,
                  "lastInitName": "Kjerstad, H",
                  "lastName": "Kjerstad",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-09-14",
                  "link": "/api/v1/people/677008",
                  "nameFirstLast": "Heston Kjerstad",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 24,
                  "firstLastName": "Heston Kjerstad",
                  "lastFirstName": "Kjerstad, Heston",
                  "birthCountry": "USA",
                  "useName": "Heston",
                  "id": 677008,
                  "fullFMLName": "Heston Sawyer Kjerstad",
                  "height": "6' 3\"",
                  "nameSlug": "heston-kjerstad-677008",
                  "pronunciation": "kerr-stad",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2020,
                  "boxscoreName": "Kjerstad",
                  "fullName": "Heston Kjerstad",
                  "weight": 205,
                  "active": true,
                  "birthCity": "Amarillo",
                  "initLastName": "H Kjerstad",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1999-02-12",
                  "primaryNumber": "13",
                  "firstName": "Heston",
                  "fullLFMName": "Kjerstad, Heston Sawyer",
                  "useLastName": "Kjerstad",
                  "middleName": "Sawyer",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID656427": {
                  "isPlayer": true,
                  "lastInitName": "Flaherty, J",
                  "lastName": "Flaherty",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-09-01",
                  "link": "/api/v1/people/656427",
                  "nameFirstLast": "Jack Flaherty",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Jack Flaherty",
                  "lastFirstName": "Flaherty, Jack",
                  "birthCountry": "USA",
                  "useName": "Jack",
                  "id": 656427,
                  "fullFMLName": "Jack Rafe Flaherty",
                  "height": "6' 4\"",
                  "nameSlug": "jack-flaherty-656427",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Flare",
                  "draftYear": 2014,
                  "boxscoreName": "Flaherty",
                  "fullName": "Jack Flaherty",
                  "weight": 225,
                  "active": true,
                  "birthCity": "Burbank",
                  "initLastName": "J Flaherty",
                  "strikeZoneTop": 3.48,
                  "birthDate": "1995-10-15",
                  "primaryNumber": "15",
                  "firstName": "Jack",
                  "fullLFMName": "Flaherty, Jack Rafe",
                  "useLastName": "Flaherty",
                  "middleName": "Rafe",
                  "strikeZoneBottom": 1.62,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID543305": {
                  "isPlayer": true,
                  "lastInitName": "Hicks, A",
                  "lastName": "Hicks",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-04-01",
                  "link": "/api/v1/people/543305",
                  "nameFirstLast": "Aaron Hicks",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 33,
                  "firstLastName": "Aaron Hicks",
                  "lastFirstName": "Hicks, Aaron",
                  "birthCountry": "USA",
                  "useName": "Aaron",
                  "id": 543305,
                  "fullFMLName": "Aaron Michael Hicks",
                  "height": "6' 1\"",
                  "nameSlug": "aaron-hicks-543305",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Hicksie",
                  "draftYear": 2008,
                  "boxscoreName": "Hicks, A",
                  "fullName": "Aaron Hicks",
                  "weight": 205,
                  "active": true,
                  "birthCity": "San Pedro",
                  "initLastName": "A Hicks",
                  "strikeZoneTop": 3.63,
                  "birthDate": "1989-10-02",
                  "primaryNumber": "34",
                  "firstName": "Aaron",
                  "fullLFMName": "Hicks, Aaron Michael",
                  "useLastName": "Hicks",
                  "middleName": "Michael",
                  "strikeZoneBottom": 1.76,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID656986": {
                  "isPlayer": true,
                  "lastInitName": "Sousa, B",
                  "lastName": "Sousa",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-04-08",
                  "link": "/api/v1/people/656986",
                  "nameFirstLast": "Bennett Sousa",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "Bennett Sousa",
                  "lastFirstName": "Sousa, Bennett",
                  "birthCountry": "USA",
                  "useName": "Bennett",
                  "id": 656986,
                  "fullFMLName": "John Bennett Sousa",
                  "height": "6' 3\"",
                  "nameSlug": "bennett-sousa-656986",
                  "pronunciation": "SUE-zuh",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "Sousa",
                  "fullName": "Bennett Sousa",
                  "weight": 220,
                  "active": true,
                  "birthCity": "North Palm Beach",
                  "initLastName": "B Sousa",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1995-04-06",
                  "primaryNumber": "62",
                  "firstName": "John",
                  "fullLFMName": "Sousa, John Bennett",
                  "useLastName": "Sousa",
                  "middleName": "Bennett",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID666197": {
                  "isPlayer": true,
                  "lastInitName": "Kessinger, G",
                  "lastName": "Kessinger",
                  "birthStateProvince": "MS",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2023-06-07",
                  "link": "/api/v1/people/666197",
                  "nameFirstLast": "Grae Kessinger",
                  "primaryPosition": {
                    "code": "6",
                    "name": "Shortstop",
                    "type": "Infielder",
                    "abbreviation": "SS"
                  },
                  "currentAge": 26,
                  "firstLastName": "Grae Kessinger",
                  "lastFirstName": "Kessinger, Grae",
                  "birthCountry": "USA",
                  "useName": "Grae",
                  "id": 666197,
                  "fullFMLName": "Graeber Crawley Kessinger",
                  "height": "6' 1\"",
                  "nameSlug": "grae-kessinger-666197",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Kessinger",
                  "fullName": "Grae Kessinger",
                  "weight": 204,
                  "active": true,
                  "birthCity": "Oxford",
                  "initLastName": "G Kessinger",
                  "strikeZoneTop": 3.26,
                  "birthDate": "1997-08-25",
                  "primaryNumber": "16",
                  "firstName": "Graeber",
                  "fullLFMName": "Kessinger, Graeber Crawley",
                  "useLastName": "Kessinger",
                  "middleName": "Crawley",
                  "strikeZoneBottom": 1.54,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID602104": {
                  "isPlayer": true,
                  "lastInitName": "Urías, R",
                  "lastName": "Urias",
                  "birthStateProvince": "SO",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2020-08-20",
                  "link": "/api/v1/people/602104",
                  "nameFirstLast": "Ramon Urias",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 29,
                  "firstLastName": "Ramón Urías",
                  "lastFirstName": "Urías, Ramón",
                  "birthCountry": "Mexico",
                  "useName": "Ramon",
                  "id": 602104,
                  "fullFMLName": "Ramón Francisco Urías",
                  "height": "5' 10\"",
                  "nameMatrilineal": "Figueroa",
                  "nameSlug": "ramon-urias-602104",
                  "pronunciation": "Uoo-REE-ahs",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Urías, R",
                  "fullName": "Ramon Urias",
                  "weight": 185,
                  "active": true,
                  "birthCity": "Magdalena de Kino",
                  "initLastName": "R Urías",
                  "strikeZoneTop": 3.13,
                  "birthDate": "1994-06-03",
                  "primaryNumber": "29",
                  "firstName": "Ramon",
                  "fullLFMName": "Urías, Ramón Francisco",
                  "useLastName": "Urías",
                  "middleName": "Francisco",
                  "strikeZoneBottom": 1.48,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID488726": {
                  "isPlayer": true,
                  "lastInitName": "Brantley, M",
                  "lastName": "Brantley",
                  "birthStateProvince": "WA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2009-09-01",
                  "link": "/api/v1/people/488726",
                  "nameFirstLast": "Michael Brantley",
                  "nameSuffix": "Jr.",
                  "primaryPosition": {
                    "code": "10",
                    "name": "Designated Hitter",
                    "type": "Hitter",
                    "abbreviation": "DH"
                  },
                  "currentAge": 36,
                  "firstLastName": "Michael Brantley",
                  "lastFirstName": "Brantley, Michael",
                  "birthCountry": "USA",
                  "useName": "Michael",
                  "id": 488726,
                  "fullFMLName": "Michael Charles Brantley",
                  "height": "6' 2\"",
                  "nameSlug": "michael-brantley-488726",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Champ",
                  "draftYear": 2005,
                  "nameTitle": "Jr.",
                  "boxscoreName": "Brantley",
                  "fullName": "Michael Brantley",
                  "weight": 209,
                  "active": true,
                  "birthCity": "Bellevue",
                  "initLastName": "M Brantley",
                  "strikeZoneTop": 3.22,
                  "birthDate": "1987-05-15",
                  "primaryNumber": "23",
                  "firstName": "Michael",
                  "fullLFMName": "Brantley, Michael Charles",
                  "useLastName": "Brantley",
                  "middleName": "Charles",
                  "strikeZoneBottom": 1.46,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID664299": {
                  "isPlayer": true,
                  "lastInitName": "Javier, C",
                  "lastName": "Javier",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2020-07-25",
                  "link": "/api/v1/people/664299",
                  "nameFirstLast": "Cristian Javier",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 26,
                  "firstLastName": "Cristian Javier",
                  "lastFirstName": "Javier, Cristian",
                  "birthCountry": "Dominican Republic",
                  "useName": "Cristian",
                  "id": 664299,
                  "fullFMLName": "Cristian Javier",
                  "height": "6' 1\"",
                  "nameMatrilineal": "Mieses",
                  "nameSlug": "cristian-javier-664299",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Javier",
                  "fullName": "Cristian Javier",
                  "weight": 213,
                  "active": true,
                  "birthCity": "Santo Domingo",
                  "initLastName": "C Javier",
                  "strikeZoneTop": 3.411,
                  "birthDate": "1997-03-26",
                  "primaryNumber": "53",
                  "firstName": "Cristian",
                  "fullLFMName": "Javier, Cristian",
                  "useLastName": "Javier",
                  "strikeZoneBottom": 1.565,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID519151": {
                  "isPlayer": true,
                  "lastInitName": "Pressly, R",
                  "lastName": "Pressly",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-04-04",
                  "link": "/api/v1/people/519151",
                  "nameFirstLast": "Ryan Pressly",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 34,
                  "firstLastName": "Ryan Pressly",
                  "lastFirstName": "Pressly, Ryan",
                  "birthCountry": "USA",
                  "useName": "Ryan",
                  "id": 519151,
                  "fullFMLName": "Thomas Ryan Pressly",
                  "height": "6' 2\"",
                  "nameSlug": "ryan-pressly-519151",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Press",
                  "draftYear": 2007,
                  "boxscoreName": "Pressly",
                  "fullName": "Ryan Pressly",
                  "weight": 206,
                  "active": true,
                  "birthCity": "Dallas",
                  "initLastName": "R Pressly",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1988-12-15",
                  "primaryNumber": "55",
                  "firstName": "Thomas",
                  "fullLFMName": "Pressly, Thomas Ryan",
                  "useLastName": "Pressly",
                  "middleName": "Ryan",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID664208": {
                  "isPlayer": true,
                  "lastInitName": "Maton, P",
                  "lastName": "Maton",
                  "birthStateProvince": "KY",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-06-11",
                  "link": "/api/v1/people/664208",
                  "nameFirstLast": "Phil Maton",
                  "nameSuffix": "III",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "Phil Maton",
                  "lastFirstName": "Maton, Phil",
                  "birthCountry": "USA",
                  "useName": "Phil",
                  "id": 664208,
                  "fullFMLName": "Phillip Louis Maton",
                  "height": "6' 2\"",
                  "nameSlug": "phil-maton-664208",
                  "pronunciation": "MAY-tahn",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Spin Rate",
                  "draftYear": 2015,
                  "nameTitle": "III",
                  "boxscoreName": "Maton, P",
                  "fullName": "Phil Maton",
                  "weight": 206,
                  "active": true,
                  "birthCity": "Paducah",
                  "initLastName": "P Maton",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1993-03-25",
                  "primaryNumber": "88",
                  "firstName": "Phillip",
                  "fullLFMName": "Maton, Phillip Louis",
                  "useLastName": "Maton",
                  "middleName": "Louis",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID543510": {
                  "isPlayer": true,
                  "lastInitName": "McCann, J",
                  "lastName": "McCann",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-09-01",
                  "link": "/api/v1/people/543510",
                  "nameFirstLast": "James McCann",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 33,
                  "firstLastName": "James McCann",
                  "lastFirstName": "McCann, James",
                  "birthCountry": "USA",
                  "useName": "James",
                  "id": 543510,
                  "fullFMLName": "James Thomas McCann",
                  "height": "6' 3\"",
                  "nameSlug": "james-mccann-543510",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "McCannon",
                  "draftYear": 2011,
                  "boxscoreName": "McCann",
                  "fullName": "James McCann",
                  "weight": 235,
                  "active": true,
                  "birthCity": "Santa Barbara",
                  "initLastName": "J McCann",
                  "strikeZoneTop": 3.35,
                  "birthDate": "1990-06-13",
                  "primaryNumber": "27",
                  "firstName": "James",
                  "fullLFMName": "McCann, James Thomas",
                  "useLastName": "McCann",
                  "middleName": "Thomas",
                  "strikeZoneBottom": 1.49,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID502043": {
                  "isPlayer": true,
                  "lastInitName": "Gibson, K",
                  "lastName": "Gibson",
                  "birthStateProvince": "IN",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2013-06-29",
                  "link": "/api/v1/people/502043",
                  "nameFirstLast": "Kyle Gibson",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 35,
                  "firstLastName": "Kyle Gibson",
                  "lastFirstName": "Gibson, Kyle",
                  "birthCountry": "USA",
                  "useName": "Kyle",
                  "id": 502043,
                  "fullFMLName": "Kyle Benjamin Gibson",
                  "height": "6' 6\"",
                  "nameSlug": "kyle-gibson-502043",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Gibby",
                  "draftYear": 2009,
                  "boxscoreName": "Gibson",
                  "fullName": "Kyle Gibson",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Greenfield",
                  "initLastName": "K Gibson",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1987-10-23",
                  "primaryNumber": "48",
                  "firstName": "Kyle",
                  "fullLFMName": "Gibson, Kyle Benjamin",
                  "useLastName": "Gibson",
                  "middleName": "Benjamin",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID673237": {
                  "isPlayer": true,
                  "lastInitName": "Diaz, Y",
                  "lastName": "Diaz",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-09-02",
                  "link": "/api/v1/people/673237",
                  "nameFirstLast": "Yainer Diaz",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 25,
                  "firstLastName": "Yainer Diaz",
                  "lastFirstName": "Diaz, Yainer",
                  "birthCountry": "Dominican Republic",
                  "useName": "Yainer",
                  "id": 673237,
                  "fullFMLName": "Yainer Radhames Diaz",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Lopez",
                  "nameSlug": "yainer-diaz-673237",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Diaz, Y",
                  "fullName": "Yainer Diaz",
                  "weight": 195,
                  "active": true,
                  "birthCity": "Azua",
                  "initLastName": "Y Diaz",
                  "strikeZoneTop": 3.17,
                  "birthDate": "1998-09-21",
                  "primaryNumber": "21",
                  "firstName": "Yainer",
                  "fullLFMName": "Diaz, Yainer Radhames",
                  "useLastName": "Diaz",
                  "middleName": "Radhames",
                  "strikeZoneBottom": 1.45,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID665152": {
                  "isPlayer": true,
                  "lastInitName": "Kremer, D",
                  "lastName": "Kremer",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2020-09-06",
                  "link": "/api/v1/people/665152",
                  "nameFirstLast": "Dean Kremer",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Dean Kremer",
                  "lastFirstName": "Kremer, Dean",
                  "birthCountry": "USA",
                  "useName": "Dean",
                  "id": 665152,
                  "fullFMLName": "Dean Junior Kremer",
                  "height": "6' 2\"",
                  "nameSlug": "dean-kremer-665152",
                  "pronunciation": "KRAY-mer",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2016,
                  "boxscoreName": "Kremer",
                  "fullName": "Dean Kremer",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Stockton",
                  "initLastName": "D Kremer",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1996-01-07",
                  "primaryNumber": "64",
                  "firstName": "Dean",
                  "fullLFMName": "Kremer, Dean Junior",
                  "useLastName": "Kremer",
                  "middleName": "Junior",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID593576": {
                  "isPlayer": true,
                  "lastInitName": "Neris, H",
                  "lastName": "Neris",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-08-05",
                  "link": "/api/v1/people/593576",
                  "nameFirstLast": "Hector Neris",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 34,
                  "firstLastName": "Hector Neris",
                  "lastFirstName": "Neris, Hector",
                  "birthCountry": "Dominican Republic",
                  "useName": "Hector",
                  "id": 593576,
                  "fullFMLName": "Hector Neris",
                  "height": "6' 2\"",
                  "nameSlug": "hector-neris-593576",
                  "pronunciation": "HEHK-ter NAIR-iss",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Compa N",
                  "boxscoreName": "Neris",
                  "fullName": "Hector Neris",
                  "weight": 227,
                  "active": true,
                  "birthCity": "Villa Altagracia",
                  "initLastName": "H Neris",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1989-06-14",
                  "primaryNumber": "50",
                  "firstName": "Hector",
                  "fullLFMName": "Neris, Hector ",
                  "useLastName": "Neris",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID660261": {
                  "isPlayer": true,
                  "lastInitName": "Fujinami, S",
                  "lastName": "Fujinami",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-04-01",
                  "link": "/api/v1/people/660261",
                  "nameFirstLast": "Shintaro Fujinami",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Shintaro Fujinami",
                  "lastFirstName": "Fujinami, Shintaro",
                  "birthCountry": "Japan",
                  "useName": "Shintaro",
                  "id": 660261,
                  "fullFMLName": "Shintaro Fujinami",
                  "height": "6' 6\"",
                  "nameSlug": "shintaro-fujinami-660261",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Fujinami",
                  "fullName": "Shintaro Fujinami",
                  "weight": 180,
                  "active": true,
                  "birthCity": "Sakai",
                  "initLastName": "S Fujinami",
                  "strikeZoneTop": 3.656,
                  "birthDate": "1994-04-12",
                  "primaryNumber": "14",
                  "firstName": "Shintaro",
                  "fullLFMName": "Fujinami, Shintaro",
                  "useLastName": "Fujinami",
                  "strikeZoneBottom": 1.677,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID663656": {
                  "isPlayer": true,
                  "lastInitName": "Tucker, K",
                  "lastName": "Tucker",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-07-07",
                  "link": "/api/v1/people/663656",
                  "nameFirstLast": "Kyle Tucker",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 26,
                  "firstLastName": "Kyle Tucker",
                  "lastFirstName": "Tucker, Kyle",
                  "birthCountry": "USA",
                  "useName": "Kyle",
                  "id": 663656,
                  "fullFMLName": "Kyle Daniel Tucker",
                  "height": "6' 4\"",
                  "nameSlug": "kyle-tucker-663656",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2015,
                  "boxscoreName": "Tucker",
                  "fullName": "Kyle Tucker",
                  "weight": 199,
                  "active": true,
                  "birthCity": "Tampa",
                  "initLastName": "K Tucker",
                  "strikeZoneTop": 3.51,
                  "birthDate": "1997-01-17",
                  "primaryNumber": "30",
                  "firstName": "Kyle",
                  "fullLFMName": "Tucker, Kyle Daniel",
                  "useLastName": "Tucker",
                  "middleName": "Daniel",
                  "strikeZoneBottom": 1.69,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID623993": {
                  "isPlayer": true,
                  "lastInitName": "Santander, A",
                  "lastName": "Santander",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-08-18",
                  "link": "/api/v1/people/623993",
                  "nameFirstLast": "Anthony Santander",
                  "primaryPosition": {
                    "code": "9",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "RF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Anthony Santander",
                  "lastFirstName": "Santander, Anthony",
                  "birthCountry": "Venezuela",
                  "useName": "Anthony",
                  "id": 623993,
                  "fullFMLName": "Anthony Roger Santander",
                  "height": "6' 2\"",
                  "nameSlug": "anthony-santander-623993",
                  "pronunciation": "SAHN-tahn-dare",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Agua Blanca",
                  "boxscoreName": "Santander",
                  "fullName": "Anthony Santander",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Margarita",
                  "initLastName": "A Santander",
                  "strikeZoneTop": 3.4,
                  "birthDate": "1994-10-19",
                  "primaryNumber": "25",
                  "firstName": "Anthony",
                  "fullLFMName": "Santander, Anthony Roger",
                  "useLastName": "Santander",
                  "middleName": "Roger",
                  "strikeZoneBottom": 1.63,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID641585": {
                  "isPlayer": true,
                  "lastInitName": "France, J",
                  "lastName": "France",
                  "birthStateProvince": "LA",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2023-05-06",
                  "link": "/api/v1/people/641585",
                  "nameFirstLast": "J.P. France",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "J.P. France",
                  "lastFirstName": "France, J.P.",
                  "birthCountry": "USA",
                  "useName": "J.P.",
                  "id": 641585,
                  "fullFMLName": "Jonathan Patrick France",
                  "height": "6' 0\"",
                  "nameSlug": "j-p-france-641585",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2018,
                  "boxscoreName": "France, J",
                  "fullName": "J.P. France",
                  "weight": 216,
                  "active": true,
                  "birthCity": "New Orleans",
                  "initLastName": "J France",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1995-04-04",
                  "primaryNumber": "68",
                  "firstName": "Jonathan",
                  "fullLFMName": "France, Jonathan Patrick",
                  "useLastName": "France",
                  "middleName": "Patrick",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID643289": {
                  "isPlayer": true,
                  "lastInitName": "Dubón, M",
                  "lastName": "Dubon",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-07-07",
                  "link": "/api/v1/people/643289",
                  "nameFirstLast": "Mauricio Dubon",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 29,
                  "firstLastName": "Mauricio Dubón",
                  "lastFirstName": "Dubón, Mauricio",
                  "birthCountry": "Honduras",
                  "useName": "Mauricio",
                  "id": 643289,
                  "fullFMLName": "Mauricio Andre Dubón",
                  "height": "6' 0\"",
                  "nameSlug": "mauricio-dubon-643289",
                  "pronunciation": "do-BOHN",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2013,
                  "boxscoreName": "Dubón",
                  "fullName": "Mauricio Dubon",
                  "weight": 173,
                  "active": true,
                  "birthCity": "San Pedro Sula",
                  "initLastName": "M Dubón",
                  "strikeZoneTop": 3.25,
                  "birthDate": "1994-07-19",
                  "primaryNumber": "14",
                  "firstName": "Mauricio",
                  "fullLFMName": "Dubón, Mauricio Andre",
                  "useLastName": "Dubón",
                  "middleName": "Andre",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID686613": {
                  "isPlayer": true,
                  "lastInitName": "Brown, H",
                  "lastName": "Brown",
                  "birthStateProvince": "MI",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-09-05",
                  "link": "/api/v1/people/686613",
                  "nameFirstLast": "Hunter Brown",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 25,
                  "firstLastName": "Hunter Brown",
                  "lastFirstName": "Brown, Hunter",
                  "birthCountry": "USA",
                  "useName": "Hunter",
                  "id": 686613,
                  "fullFMLName": "Hunter Noah Brown",
                  "height": "6' 2\"",
                  "nameSlug": "hunter-brown-686613",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Brown, H",
                  "fullName": "Hunter Brown",
                  "weight": 212,
                  "active": true,
                  "birthCity": "Detroit",
                  "initLastName": "H Brown",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1998-08-29",
                  "primaryNumber": "58",
                  "firstName": "Hunter",
                  "fullLFMName": "Brown, Hunter Noah",
                  "useLastName": "Brown",
                  "middleName": "Noah",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID608324": {
                  "isPlayer": true,
                  "lastInitName": "Bregman, A",
                  "lastName": "Bregman",
                  "birthStateProvince": "NM",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2016-07-25",
                  "link": "/api/v1/people/608324",
                  "nameFirstLast": "Alex Bregman",
                  "primaryPosition": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "currentAge": 29,
                  "firstLastName": "Alex Bregman",
                  "lastFirstName": "Bregman, Alex",
                  "birthCountry": "USA",
                  "useName": "Alex",
                  "id": 608324,
                  "fullFMLName": "Alexander David Bregman",
                  "height": "6' 0\"",
                  "nameSlug": "alex-bregman-608324",
                  "pronunciation": "BREGG-min",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "A-Breg",
                  "draftYear": 2015,
                  "boxscoreName": "Bregman",
                  "fullName": "Alex Bregman",
                  "weight": 192,
                  "active": true,
                  "birthCity": "Albuquerque",
                  "initLastName": "A Bregman",
                  "strikeZoneTop": 3.01,
                  "birthDate": "1994-03-30",
                  "primaryNumber": "2",
                  "firstName": "Alexander",
                  "fullLFMName": "Bregman, Alexander David",
                  "useLastName": "Bregman",
                  "middleName": "David",
                  "strikeZoneBottom": 1.46,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID668939": {
                  "isPlayer": true,
                  "lastInitName": "Rutschman, A",
                  "lastName": "Rutschman",
                  "birthStateProvince": "OR",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-05-21",
                  "link": "/api/v1/people/668939",
                  "nameFirstLast": "Adley Rutschman",
                  "primaryPosition": {
                    "code": "2",
                    "name": "Catcher",
                    "type": "Catcher",
                    "abbreviation": "C"
                  },
                  "currentAge": 25,
                  "firstLastName": "Adley Rutschman",
                  "lastFirstName": "Rutschman, Adley",
                  "birthCountry": "USA",
                  "useName": "Adley",
                  "id": 668939,
                  "fullFMLName": "Adley Stan Rutschman",
                  "height": "6' 2\"",
                  "nameSlug": "adley-rutschman-668939",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2019,
                  "boxscoreName": "Rutschman",
                  "fullName": "Adley Rutschman",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Portland",
                  "initLastName": "A Rutschman",
                  "strikeZoneTop": 3.41,
                  "birthDate": "1998-02-06",
                  "primaryNumber": "35",
                  "firstName": "Adley",
                  "fullLFMName": "Rutschman, Adley Stan",
                  "useLastName": "Rutschman",
                  "middleName": "Stan",
                  "strikeZoneBottom": 1.68,
                  "batSide": {
                    "code": "S",
                    "description": "Switch"
                  }
                },
                "ID676694": {
                  "isPlayer": true,
                  "lastInitName": "Meyers, J",
                  "lastName": "Meyers",
                  "birthStateProvince": "NE",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2021-08-01",
                  "link": "/api/v1/people/676694",
                  "nameFirstLast": "Jake Meyers",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 27,
                  "firstLastName": "Jake Meyers",
                  "lastFirstName": "Meyers, Jake",
                  "birthCountry": "USA",
                  "useName": "Jake",
                  "id": 676694,
                  "fullFMLName": "Jacob Berkshire Meyers",
                  "height": "6' 0\"",
                  "nameSlug": "jake-meyers-676694",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Meyers",
                  "fullName": "Jake Meyers",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Omaha",
                  "initLastName": "J Meyers",
                  "strikeZoneTop": 3.2,
                  "birthDate": "1996-06-18",
                  "primaryNumber": "6",
                  "firstName": "Jacob",
                  "fullLFMName": "Meyers, Jacob Berkshire",
                  "useLastName": "Meyers",
                  "middleName": "Berkshire",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID657097": {
                  "isPlayer": true,
                  "lastInitName": "Webb, J",
                  "lastName": "Webb",
                  "birthStateProvince": "CA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-04-16",
                  "link": "/api/v1/people/657097",
                  "nameFirstLast": "Jacob Webb",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "Jacob Webb",
                  "lastFirstName": "Webb, Jacob",
                  "birthCountry": "USA",
                  "useName": "Jacob",
                  "id": 657097,
                  "fullFMLName": "Jacob Lawrence Webb",
                  "height": "6' 2\"",
                  "nameSlug": "jacob-webb-657097",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2014,
                  "boxscoreName": "Webb",
                  "fullName": "Jacob Webb",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Riverside",
                  "initLastName": "J Webb",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1993-08-15",
                  "primaryNumber": "66",
                  "firstName": "Jacob",
                  "fullLFMName": "Webb, Jacob Lawrence",
                  "useLastName": "Webb",
                  "middleName": "Lawrence",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID676059": {
                  "isPlayer": true,
                  "lastInitName": "Westburg, J",
                  "lastName": "Westburg",
                  "birthStateProvince": "TX",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2023-06-26",
                  "link": "/api/v1/people/676059",
                  "nameFirstLast": "Jordan Westburg",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 24,
                  "firstLastName": "Jordan Westburg",
                  "lastFirstName": "Westburg, Jordan",
                  "birthCountry": "USA",
                  "useName": "Jordan",
                  "id": 676059,
                  "fullFMLName": "Jordan Cole Westburg",
                  "height": "6' 2\"",
                  "nameSlug": "jordan-westburg-676059",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2020,
                  "boxscoreName": "Westburg",
                  "fullName": "Jordan Westburg",
                  "weight": 210,
                  "active": true,
                  "birthCity": "New Braunfels",
                  "initLastName": "J Westburg",
                  "strikeZoneTop": 3.42,
                  "birthDate": "1999-02-18",
                  "primaryNumber": "11",
                  "firstName": "Jordan",
                  "fullLFMName": "Westburg, Jordan Cole",
                  "useLastName": "Westburg",
                  "middleName": "Cole",
                  "strikeZoneBottom": 1.64,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID669270": {
                  "isPlayer": true,
                  "lastInitName": "Kuhnel, J",
                  "lastName": "Kuhnel",
                  "birthStateProvince": "NC",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2019-08-16",
                  "link": "/api/v1/people/669270",
                  "nameFirstLast": "Joel Kuhnel",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "Joel Kuhnel",
                  "lastFirstName": "Kuhnel, Joel",
                  "birthCountry": "USA",
                  "useName": "Joel",
                  "id": 669270,
                  "fullFMLName": "Joel Kenneth Kuhnel",
                  "height": "6' 5\"",
                  "nameSlug": "joel-kuhnel-669270",
                  "pronunciation": "COON-uhl",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2016,
                  "boxscoreName": "Kuhnel",
                  "fullName": "Joel Kuhnel",
                  "weight": 290,
                  "active": true,
                  "birthCity": "Goldsboro",
                  "initLastName": "J Kuhnel",
                  "strikeZoneTop": 3.575,
                  "birthDate": "1995-02-19",
                  "primaryNumber": "60",
                  "firstName": "Joel",
                  "fullLFMName": "Kuhnel, Joel Kenneth",
                  "useLastName": "Kuhnel",
                  "middleName": "Kenneth",
                  "strikeZoneBottom": 1.681,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID672335": {
                  "isPlayer": true,
                  "lastInitName": "Pérez, C",
                  "lastName": "Perez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-07-11",
                  "link": "/api/v1/people/672335",
                  "nameFirstLast": "Cionel Perez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 27,
                  "firstLastName": "Cionel Pérez",
                  "lastFirstName": "Pérez, Cionel",
                  "birthCountry": "Cuba",
                  "useName": "Cionel",
                  "id": 672335,
                  "fullFMLName": "Cionel Felix Pérez",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Viera",
                  "nameSlug": "cionel-perez-672335",
                  "pronunciation": "see-oh-NELL",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "boxscoreName": "Pérez, C",
                  "fullName": "Cionel Perez",
                  "weight": 175,
                  "active": true,
                  "birthCity": "La Habana",
                  "initLastName": "C Pérez",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1996-04-21",
                  "primaryNumber": "58",
                  "firstName": "Cionel",
                  "fullLFMName": "Pérez, Cionel Felix",
                  "useLastName": "Pérez",
                  "middleName": "Felix",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID669720": {
                  "isPlayer": true,
                  "lastInitName": "Hays, A",
                  "lastName": "Hays",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2017-09-07",
                  "link": "/api/v1/people/669720",
                  "nameFirstLast": "Austin Hays",
                  "primaryPosition": {
                    "code": "7",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "LF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Austin Hays",
                  "lastFirstName": "Hays, Austin",
                  "birthCountry": "USA",
                  "useName": "Austin",
                  "id": 669720,
                  "fullFMLName": "Austin Charles Bryan Hays",
                  "height": "5' 11\"",
                  "nameSlug": "austin-hays-669720",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "draftYear": 2016,
                  "boxscoreName": "Hays",
                  "fullName": "Austin Hays",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Daytona Beach",
                  "initLastName": "A Hays",
                  "strikeZoneTop": 3.22,
                  "birthDate": "1995-07-05",
                  "primaryNumber": "21",
                  "firstName": "Austin",
                  "fullLFMName": "Hays, Austin Charles Bryan",
                  "useLastName": "Hays",
                  "middleName": "Charles Bryan",
                  "strikeZoneBottom": 1.48,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID514888": {
                  "isPlayer": true,
                  "lastInitName": "Altuve, J",
                  "lastName": "Altuve",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2011-07-20",
                  "link": "/api/v1/people/514888",
                  "nameFirstLast": "Jose Altuve",
                  "primaryPosition": {
                    "code": "4",
                    "name": "Second Base",
                    "type": "Infielder",
                    "abbreviation": "2B"
                  },
                  "currentAge": 33,
                  "firstLastName": "Jose Altuve",
                  "lastFirstName": "Altuve, Jose",
                  "birthCountry": "Venezuela",
                  "useName": "Jose",
                  "id": 514888,
                  "fullFMLName": "Jose Carlos Altuve",
                  "height": "5' 6\"",
                  "nameSlug": "jose-altuve-514888",
                  "pronunciation": "al-TOO-vay",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Tuve",
                  "boxscoreName": "Altuve",
                  "fullName": "Jose Altuve",
                  "weight": 166,
                  "active": true,
                  "birthCity": "Maracay",
                  "initLastName": "J Altuve",
                  "strikeZoneTop": 2.82,
                  "birthDate": "1990-05-06",
                  "primaryNumber": "27",
                  "firstName": "Jose",
                  "fullLFMName": "Altuve, Jose Carlos",
                  "useLastName": "Altuve",
                  "middleName": "Carlos",
                  "strikeZoneBottom": 1.25,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID665161": {
                  "isPlayer": true,
                  "lastInitName": "Peña, J",
                  "lastName": "Pena",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-04-07",
                  "link": "/api/v1/people/665161",
                  "nameFirstLast": "Jeremy Pena",
                  "primaryPosition": {
                    "code": "6",
                    "name": "Shortstop",
                    "type": "Infielder",
                    "abbreviation": "SS"
                  },
                  "currentAge": 25,
                  "firstLastName": "Jeremy Peña",
                  "lastFirstName": "Peña, Jeremy",
                  "birthCountry": "Dominican Republic",
                  "useName": "Jeremy",
                  "id": 665161,
                  "fullFMLName": "Jeremy Joan Peña",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Pineyro",
                  "nameSlug": "jeremy-pena-665161",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "La Tormenta",
                  "draftYear": 2018,
                  "boxscoreName": "Peña",
                  "fullName": "Jeremy Pena",
                  "weight": 202,
                  "active": true,
                  "birthCity": "Santo Domingo",
                  "initLastName": "J Peña",
                  "strikeZoneTop": 3.57,
                  "birthDate": "1997-09-22",
                  "primaryNumber": "3",
                  "firstName": "Jeremy",
                  "fullLFMName": "Peña, Jeremy Joan",
                  "useLastName": "Peña",
                  "middleName": "Joan",
                  "strikeZoneBottom": 1.71,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID664353": {
                  "isPlayer": true,
                  "lastInitName": "Urquidy, J",
                  "lastName": "Urquidy",
                  "birthStateProvince": "Sinaloa",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-07-02",
                  "link": "/api/v1/people/664353",
                  "nameFirstLast": "Jose Urquidy",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 28,
                  "firstLastName": "José Urquidy",
                  "lastFirstName": "Urquidy, José",
                  "birthCountry": "Mexico",
                  "useName": "Jose",
                  "id": 664353,
                  "fullFMLName": "José Luis Urquidy",
                  "height": "6' 0\"",
                  "nameMatrilineal": "Hernandez",
                  "nameSlug": "jose-urquidy-664353",
                  "pronunciation": "ur-KEE-dee",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Urquidy",
                  "fullName": "Jose Urquidy",
                  "weight": 217,
                  "active": true,
                  "birthCity": "Mazatlan",
                  "initLastName": "J Urquidy",
                  "strikeZoneTop": 3.371,
                  "birthDate": "1995-05-01",
                  "primaryNumber": "65",
                  "firstName": "Jose",
                  "fullLFMName": "Urquidy, José Luis",
                  "useLastName": "Urquidy",
                  "middleName": "Luis",
                  "strikeZoneBottom": 1.535,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID666974": {
                  "isPlayer": true,
                  "lastInitName": "Cano, Y",
                  "lastName": "Cano",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-05-11",
                  "link": "/api/v1/people/666974",
                  "nameFirstLast": "Yennier Cano",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 29,
                  "firstLastName": "Yennier Cano",
                  "lastFirstName": "Cano, Yennier",
                  "birthCountry": "Cuba",
                  "useName": "Yennier",
                  "id": 666974,
                  "fullFMLName": "Yennier  Cano",
                  "height": "6' 4\"",
                  "nameMatrilineal": "Banes",
                  "nameSlug": "yennier-cano-666974",
                  "pronunciation": "yen-NEER",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "boxscoreName": "Cano",
                  "fullName": "Yennier Cano",
                  "weight": 245,
                  "active": true,
                  "birthCity": "Havana",
                  "initLastName": "Y Cano",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1994-03-09",
                  "primaryNumber": "78",
                  "firstName": "Yennier",
                  "fullLFMName": "Cano, Yennier",
                  "useLastName": "Cano",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID607644": {
                  "isPlayer": true,
                  "lastInitName": "Means, J",
                  "lastName": "Means",
                  "birthStateProvince": "KS",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2018-09-26",
                  "link": "/api/v1/people/607644",
                  "nameFirstLast": "John Means",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "John Means",
                  "lastFirstName": "Means, John",
                  "birthCountry": "USA",
                  "useName": "John",
                  "id": 607644,
                  "fullFMLName": "John Alan Means",
                  "height": "6' 4\"",
                  "nameSlug": "john-means-607644",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Meansy",
                  "draftYear": 2014,
                  "boxscoreName": "Means",
                  "fullName": "John Means",
                  "weight": 230,
                  "active": true,
                  "birthCity": "Olathe",
                  "initLastName": "J Means",
                  "strikeZoneTop": 3.549,
                  "birthDate": "1993-04-24",
                  "primaryNumber": "47",
                  "firstName": "John",
                  "fullLFMName": "Means, John Alan",
                  "useLastName": "Means",
                  "middleName": "Alan",
                  "strikeZoneBottom": 1.627,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID605347": {
                  "isPlayer": true,
                  "lastInitName": "López, J",
                  "lastName": "Lopez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2015-09-29",
                  "link": "/api/v1/people/605347",
                  "nameFirstLast": "Jorge Lopez",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 30,
                  "firstLastName": "Jorge López",
                  "lastFirstName": "López, Jorge",
                  "birthCountry": "Puerto Rico",
                  "useName": "Jorge",
                  "id": 605347,
                  "fullFMLName": "Jorge Yabiel López",
                  "height": "6' 3\"",
                  "nameMatrilineal": "Ramos",
                  "nameSlug": "jorge-lopez-605347",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "El Pichu",
                  "draftYear": 2011,
                  "boxscoreName": "López, Jo",
                  "fullName": "Jorge Lopez",
                  "weight": 200,
                  "active": true,
                  "birthCity": "Caguas",
                  "initLastName": "J López",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1993-02-10",
                  "primaryNumber": "73",
                  "firstName": "Jorge",
                  "fullLFMName": "López, Jorge Yabiel",
                  "useLastName": "López",
                  "middleName": "Yabiel",
                  "strikeZoneBottom": 1.601,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID669084": {
                  "isPlayer": true,
                  "lastInitName": "Hall, D",
                  "lastName": "Hall",
                  "birthStateProvince": "GA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2022-08-13",
                  "link": "/api/v1/people/669084",
                  "nameFirstLast": "DL Hall",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 25,
                  "firstLastName": "DL Hall",
                  "lastFirstName": "Hall, DL",
                  "birthCountry": "USA",
                  "useName": "DL",
                  "id": 669084,
                  "fullFMLName": "Dayton Lane Hall",
                  "height": "6' 2\"",
                  "nameSlug": "dl-hall-669084",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "Hall, DL",
                  "fullName": "DL Hall",
                  "weight": 210,
                  "active": true,
                  "birthCity": "Valdosta",
                  "initLastName": "D Hall",
                  "strikeZoneTop": 3.467,
                  "birthDate": "1998-09-19",
                  "primaryNumber": "24",
                  "firstName": "Dayton",
                  "fullLFMName": "Hall, Dayton Lane",
                  "useLastName": "Hall",
                  "middleName": "Lane",
                  "strikeZoneBottom": 1.589,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID434378": {
                  "isPlayer": true,
                  "lastInitName": "Verlander, J",
                  "lastName": "Verlander",
                  "birthStateProvince": "VA",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2005-07-04",
                  "link": "/api/v1/people/434378",
                  "nameFirstLast": "Justin Verlander",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 40,
                  "firstLastName": "Justin Verlander",
                  "lastFirstName": "Verlander, Justin",
                  "birthCountry": "USA",
                  "useName": "Justin",
                  "id": 434378,
                  "fullFMLName": "Justin Brooks Verlander",
                  "height": "6' 5\"",
                  "nameSlug": "justin-verlander-434378",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "J V",
                  "draftYear": 2004,
                  "boxscoreName": "Verlander",
                  "fullName": "Justin Verlander",
                  "weight": 235,
                  "active": true,
                  "birthCity": "Manakin-Sabot",
                  "initLastName": "J Verlander",
                  "strikeZoneTop": 3.575,
                  "birthDate": "1983-02-20",
                  "primaryNumber": "35",
                  "firstName": "Justin",
                  "fullLFMName": "Verlander, Justin Brooks",
                  "useLastName": "Verlander",
                  "middleName": "Brooks",
                  "strikeZoneBottom": 1.681,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID543056": {
                  "isPlayer": true,
                  "lastInitName": "Coulombe, D",
                  "lastName": "Coulombe",
                  "birthStateProvince": "MO",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2014-09-16",
                  "link": "/api/v1/people/543056",
                  "nameFirstLast": "Danny Coulombe",
                  "primaryPosition": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "currentAge": 33,
                  "firstLastName": "Danny Coulombe",
                  "lastFirstName": "Coulombe, Danny",
                  "birthCountry": "USA",
                  "useName": "Danny",
                  "id": 543056,
                  "fullFMLName": "Daniel Paul Coulombe",
                  "height": "5' 10\"",
                  "nameSlug": "danny-coulombe-543056",
                  "pronunciation": "KOO-lohm",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Frenchie",
                  "draftYear": 2012,
                  "boxscoreName": "Coulombe",
                  "fullName": "Danny Coulombe",
                  "weight": 190,
                  "active": true,
                  "birthCity": "St. Louis",
                  "initLastName": "D Coulombe",
                  "strikeZoneTop": 3.301,
                  "birthDate": "1989-10-26",
                  "primaryNumber": "54",
                  "firstName": "Daniel",
                  "fullLFMName": "Coulombe, Daniel Paul",
                  "useLastName": "Coulombe",
                  "middleName": "Paul",
                  "strikeZoneBottom": 1.504,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID656811": {
                  "isPlayer": true,
                  "lastInitName": "O'Hearn, R",
                  "lastName": "O'Hearn",
                  "birthStateProvince": "FL",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-07-31",
                  "link": "/api/v1/people/656811",
                  "nameFirstLast": "Ryan O'Hearn",
                  "primaryPosition": {
                    "code": "3",
                    "name": "First Base",
                    "type": "Infielder",
                    "abbreviation": "1B"
                  },
                  "currentAge": 30,
                  "firstLastName": "Ryan O'Hearn",
                  "lastFirstName": "O'Hearn, Ryan",
                  "birthCountry": "USA",
                  "useName": "Ryan",
                  "id": 656811,
                  "fullFMLName": "Ryan Patrick O'Hearn",
                  "height": "6' 3\"",
                  "nameSlug": "ryan-o-hearn-656811",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "nickName": "Brohearn",
                  "draftYear": 2014,
                  "boxscoreName": "O'Hearn",
                  "fullName": "Ryan O'Hearn",
                  "weight": 220,
                  "active": true,
                  "birthCity": "Dunedin",
                  "initLastName": "R O'Hearn",
                  "strikeZoneTop": 3.49,
                  "birthDate": "1993-07-26",
                  "primaryNumber": "32",
                  "firstName": "Ryan",
                  "fullLFMName": "O'Hearn, Ryan Patrick",
                  "useLastName": "O'Hearn",
                  "middleName": "Patrick",
                  "strikeZoneBottom": 1.7,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID676801": {
                  "isPlayer": true,
                  "lastInitName": "McCormick, C",
                  "lastName": "McCormick",
                  "birthStateProvince": "PA",
                  "gender": "M",
                  "isVerified": false,
                  "mlbDebutDate": "2021-04-01",
                  "link": "/api/v1/people/676801",
                  "nameFirstLast": "Chas McCormick",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Chas McCormick",
                  "lastFirstName": "McCormick, Chas",
                  "birthCountry": "USA",
                  "useName": "Chas",
                  "id": 676801,
                  "fullFMLName": "Chas Kane McCormick",
                  "height": "6' 0\"",
                  "nameSlug": "chas-mccormick-676801",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2017,
                  "boxscoreName": "McCormick",
                  "fullName": "Chas McCormick",
                  "weight": 208,
                  "active": true,
                  "birthCity": "West Chester",
                  "initLastName": "C McCormick",
                  "strikeZoneTop": 3.26,
                  "birthDate": "1995-04-19",
                  "primaryNumber": "20",
                  "firstName": "Chas",
                  "fullLFMName": "McCormick, Chas Kane",
                  "useLastName": "McCormick",
                  "middleName": "Kane",
                  "strikeZoneBottom": 1.52,
                  "batSide": {
                    "code": "R",
                    "description": "Right"
                  }
                },
                "ID656775": {
                  "isPlayer": true,
                  "lastInitName": "Mullins, C",
                  "lastName": "Mullins",
                  "birthStateProvince": "NC",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2018-08-10",
                  "link": "/api/v1/people/656775",
                  "nameFirstLast": "Cedric Mullins",
                  "nameSuffix": "II",
                  "primaryPosition": {
                    "code": "8",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "CF"
                  },
                  "currentAge": 28,
                  "firstLastName": "Cedric Mullins",
                  "lastFirstName": "Mullins, Cedric",
                  "birthCountry": "USA",
                  "useName": "Cedric",
                  "id": 656775,
                  "fullFMLName": "Boyce Cedric Mullins",
                  "height": "5' 9\"",
                  "nameSlug": "cedric-mullins-656775",
                  "pitchHand": {
                    "code": "L",
                    "description": "Left"
                  },
                  "draftYear": 2015,
                  "nameTitle": "II",
                  "boxscoreName": "Mullins",
                  "fullName": "Cedric Mullins",
                  "weight": 175,
                  "active": true,
                  "birthCity": "Greensboro",
                  "initLastName": "C Mullins",
                  "strikeZoneTop": 3.35,
                  "birthDate": "1994-10-01",
                  "primaryNumber": "31",
                  "firstName": "Boyce",
                  "fullLFMName": "Mullins, Boyce Cedric",
                  "useLastName": "Mullins",
                  "middleName": "Cedric",
                  "strikeZoneBottom": 1.56,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                },
                "ID670541": {
                  "isPlayer": true,
                  "lastInitName": "Alvarez, Y",
                  "lastName": "Alvarez",
                  "gender": "M",
                  "isVerified": true,
                  "mlbDebutDate": "2019-06-09",
                  "link": "/api/v1/people/670541",
                  "nameFirstLast": "Yordan Alvarez",
                  "primaryPosition": {
                    "code": "7",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "LF"
                  },
                  "currentAge": 26,
                  "firstLastName": "Yordan Alvarez",
                  "lastFirstName": "Alvarez, Yordan",
                  "birthCountry": "Cuba",
                  "useName": "Yordan",
                  "id": 670541,
                  "fullFMLName": "Yordan Ruben Alvarez",
                  "height": "6' 5\"",
                  "nameMatrilineal": "Cadogan",
                  "nameSlug": "yordan-alvarez-670541",
                  "pronunciation": "YOR-dahn",
                  "pitchHand": {
                    "code": "R",
                    "description": "Right"
                  },
                  "nickName": "Yordan",
                  "boxscoreName": "Alvarez, Y",
                  "fullName": "Yordan Alvarez",
                  "weight": 225,
                  "active": true,
                  "birthCity": "Las Tunas",
                  "initLastName": "Y Alvarez",
                  "strikeZoneTop": 3.51,
                  "birthDate": "1997-06-27",
                  "primaryNumber": "44",
                  "firstName": "Yordan",
                  "fullLFMName": "Alvarez, Yordan Ruben",
                  "useLastName": "Alvarez",
                  "middleName": "Ruben",
                  "strikeZoneBottom": 1.73,
                  "batSide": {
                    "code": "L",
                    "description": "Left"
                  }
                }
              },
              "probablePitchers": {
                "away": {
                  "link": "/api/v1/people/680694",
                  "fullName": "Kyle Bradish",
                  "id": 680694
                },
                "home": {
                  "link": "/api/v1/people/664299",
                  "fullName": "Cristian Javier",
                  "id": 664299
                }
              },
              "primaryDatacaster": {
                "link": "/api/v1/people/802252",
                "fullName": "August Mueller",
                "id": 802252
              },
              "gameInfo": {
                "firstPitch": "2023-09-20T18:12:00.000Z",
                "gameDurationMinutes": 176,
                "attendance": 36427
              },
              "flags": {
                "homeTeamNoHitter": false,
                "awayTeamPerfectGame": false,
                "awayTeamNoHitter": false,
                "perfectGame": false,
                "homeTeamPerfectGame": false,
                "noHitter": false
              },
              "alerts": [],
              "datetime": {
                "dateTime": "2023-09-20T18:10:00Z",
                "dayNight": "day",
                "ampm": "PM",
                "originalDate": "2023-09-20",
                "time": "1:10",
                "officialDate": "2023-09-20"
              },
              "review": {
                "away": {
                  "used": 1,
                  "remaining": 0
                },
                "hasChallenges": true,
                "home": {
                  "used": 0,
                  "remaining": 1
                }
              },
              "weather": {
                "condition": "Roof Closed",
                "temp": "73",
                "wind": "0 mph, None"
              },
              "moundVisits": {
                "away": {
                  "used": 2,
                  "remaining": 3
                },
                "home": {
                  "used": 1,
                  "remaining": 4
                }
              },
              "status": {
                "codedGameState": "F",
                "abstractGameCode": "F",
                "abstractGameState": "Final",
                "detailedState": "Final",
                "startTimeTBD": false,
                "statusCode": "F"
              },
              "officialVenue": {
                "link": "/api/v1/venues/2392",
                "id": 2392
              }
            },
            "currentPlay": {
              "result": {
                "homeScore": 2,
                "awayScore": 1,
                "rbi": 1,
                "description": "Mauricio Dubon singles on a line drive to right fielder Anthony Santander.   Yainer Diaz scores.",
                "isOut": false,
                "eventType": "single",
                "type": "atBat",
                "event": "Single"
              },
              "actionIndex": [],
              "runnerIndex": [
                0,
                1
              ],
              "pitchIndex": [
                0
              ],
              "playEndTime": "2023-09-20T21:08:24.163Z",
              "about": {
                "hasOut": false,
                "captivatingIndex": 60,
                "inning": 9,
                "isScoringPlay": true,
                "atBatIndex": 69,
                "startTime": "2023-09-20T21:07:57.216Z",
                "isTopInning": false,
                "endTime": "2023-09-20T21:08:24.163Z",
                "hasReview": false,
                "halfInning": "bottom",
                "isComplete": true
              },
              "count": {
                "outs": 1,
                "balls": 0,
                "strikes": 0
              },
              "atBatIndex": 69,
              "runners": [
                {
                  "credits": [
                    {
                      "position": {
                        "code": "9",
                        "name": "Outfielder",
                        "type": "Outfielder",
                        "abbreviation": "RF"
                      },
                      "credit": "f_fielded_ball",
                      "player": {
                        "link": "/api/v1/people/623993",
                        "id": 623993
                      }
                    }
                  ],
                  "details": {
                    "playIndex": 0,
                    "responsiblePitcher": null,
                    "earned": false,
                    "rbi": false,
                    "teamUnearned": false,
                    "eventType": "single",
                    "isScoringEvent": false,
                    "event": "Single",
                    "runner": {
                      "link": "/api/v1/people/643289",
                      "fullName": "Mauricio Dubon",
                      "id": 643289
                    },
                    "movementReason": null
                  },
                  "movement": {
                    "outNumber": null,
                    "outBase": null,
                    "start": null,
                    "isOut": false,
                    "end": "1B",
                    "originBase": null
                  }
                },
                {
                  "credits": [],
                  "details": {
                    "playIndex": 0,
                    "responsiblePitcher": {
                      "link": "/api/v1/people/543056",
                      "id": 543056
                    },
                    "earned": true,
                    "rbi": true,
                    "teamUnearned": false,
                    "eventType": "single",
                    "isScoringEvent": true,
                    "event": "Single",
                    "runner": {
                      "link": "/api/v1/people/673237",
                      "fullName": "Yainer Diaz",
                      "id": 673237
                    },
                    "movementReason": "r_adv_play"
                  },
                  "movement": {
                    "outNumber": null,
                    "outBase": null,
                    "start": "3B",
                    "isOut": false,
                    "end": "score",
                    "originBase": "3B"
                  }
                }
              ],
              "playEvents": [
                {
                  "playId": "aea6b8a7-9850-47da-9e0a-2042d2a5de4b",
                  "pitchData": {
                    "endSpeed": 79.4,
                    "extension": 5.932061104280498,
                    "breaks": {
                      "spinRate": 2773,
                      "breakHorizontal": 0.2,
                      "breakAngle": 0,
                      "breakLength": 7.2,
                      "breakVertical": -34.1,
                      "breakY": 24,
                      "breakVerticalInduced": 2.5,
                      "spinDirection": 209
                    },
                    "startSpeed": 86.5,
                    "zone": 8,
                    "plateTime": 0.43550312043088013,
                    "coordinates": {
                      "pfxX": -0.24302567002477538,
                      "pX": -0.16732244910829744,
                      "pZ": 1.8478543382133463,
                      "pfxZ": 1.8165218162116457,
                      "vY0": -125.96312465762941,
                      "vZ0": -4.405598182669926,
                      "vX0": 0.8129706921710971,
                      "z0": 5.9973379954494215,
                      "y0": 50.00618257216229,
                      "aX": -0.3891439569541984,
                      "aY": 26.550343077243838,
                      "x": 123.38,
                      "x0": -0.4632607135112468,
                      "aZ": -29.27160205236917,
                      "y": 188.89
                    },
                    "typeConfidence": 0.9,
                    "strikeZoneTop": 3.25,
                    "strikeZoneBottom": 1.52
                  },
                  "isPitch": true,
                  "pitchNumber": 1,
                  "count": {
                    "outs": 1,
                    "balls": 0,
                    "strikes": 0
                  },
                  "index": 0,
                  "details": {
                    "call": {
                      "code": "E",
                      "description": "In play, run(s)"
                    },
                    "ballColor": "rgba(26, 86, 190, 1.0)",
                    "code": "E",
                    "description": "In play, run(s)",
                    "isBall": false,
                    "isOut": false,
                    "type": {
                      "code": "FC",
                      "description": "Cutter"
                    },
                    "trailColor": "rgba(152, 0, 101, 1.0)",
                    "hasReview": false,
                    "isInPlay": true,
                    "isStrike": false
                  },
                  "hitData": {
                    "hardness": "medium",
                    "coordinates": {
                      "coordX": 173.11,
                      "coordY": 122.46
                    },
                    "launchSpeed": 85.1,
                    "location": "9",
                    "totalDistance": 194,
                    "trajectory": "line_drive",
                    "launchAngle": 14
                  },
                  "startTime": "2023-09-20T21:08:13.961Z",
                  "endTime": "2023-09-20T21:08:24.163Z",
                  "type": "pitch"
                }
              ],
              "matchup": {
                "splits": {
                  "batter": "vs_LHP",
                  "menOnBase": "Men_On",
                  "pitcher": "vs_RHB"
                },
                "batter": {
                  "link": "/api/v1/people/643289",
                  "fullName": "Mauricio Dubon",
                  "id": 643289
                },
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "batterHotColdZones": [
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "01",
                    "value": ".429"
                  },
                  {
                    "temp": "warm",
                    "color": "rgba(234, 147, 153, .55)",
                    "zone": "02",
                    "value": "1.083"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "03",
                    "value": ".542"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "04",
                    "value": ".677"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "05",
                    "value": ".756"
                  },
                  {
                    "temp": "cool",
                    "color": "rgba(150, 188, 255, .55)",
                    "zone": "06",
                    "value": ".563"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "07",
                    "value": ".808"
                  },
                  {
                    "temp": "warm",
                    "color": "rgba(234, 147, 153, .55)",
                    "zone": "08",
                    "value": "1.054"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "09",
                    "value": ".690"
                  },
                  {
                    "temp": "cool",
                    "color": "rgba(150, 188, 255, .55)",
                    "zone": "11",
                    "value": ".586"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "12",
                    "value": ".524"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "13",
                    "value": ".810"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "14",
                    "value": ".500"
                  }
                ],
                "batterHotColdZoneStats": {
                  "stats": [
                    {
                      "splits": [
                        {
                          "stat": {
                            "name": "exitVelocity",
                            "zones": [
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "01",
                                "value": "88.54"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "02",
                                "value": "92.36"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "03",
                                "value": "90.28"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "04",
                                "value": "84.16"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "05",
                                "value": "88.50"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "06",
                                "value": "92.22"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "07",
                                "value": "89.95"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "08",
                                "value": "91.67"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "09",
                                "value": "88.40"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "11",
                                "value": "72.18"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "12",
                                "value": "84.52"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "13",
                                "value": "83.14"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "14",
                                "value": "78.40"
                              }
                            ]
                          }
                        },
                        {
                          "stat": {
                            "name": "battingAverage",
                            "zones": [
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "01",
                                "value": ".211"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "02",
                                "value": ".375"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "03",
                                "value": ".250"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "04",
                                "value": ".290"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "05",
                                "value": ".318"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "06",
                                "value": ".219"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "07",
                                "value": ".308"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "08",
                                "value": ".411"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "09",
                                "value": ".262"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "11",
                                "value": ".182"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "12",
                                "value": ".211"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "13",
                                "value": ".297"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "14",
                                "value": ".221"
                              }
                            ]
                          }
                        },
                        {
                          "stat": {
                            "name": "onBasePlusSlugging",
                            "zones": [
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "01",
                                "value": ".429"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "02",
                                "value": "1.083"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "03",
                                "value": ".542"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "04",
                                "value": ".677"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "05",
                                "value": ".756"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "06",
                                "value": ".563"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "07",
                                "value": ".808"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "08",
                                "value": "1.054"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "09",
                                "value": ".690"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "11",
                                "value": ".586"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "12",
                                "value": ".524"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "13",
                                "value": ".810"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "14",
                                "value": ".500"
                              }
                            ]
                          }
                        }
                      ],
                      "exemptions": [],
                      "type": {
                        "displayName": "hotColdZones"
                      },
                      "group": {
                        "displayName": "hitting"
                      }
                    }
                  ]
                },
                "postOnFirst": {
                  "link": "/api/v1/people/643289",
                  "fullName": "Mauricio Dubon",
                  "id": 643289
                },
                "pitcher": {
                  "link": "/api/v1/people/543056",
                  "fullName": "Danny Coulombe",
                  "id": 543056
                },
                "pitcherHotColdZones": [],
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              }
            }
          }
        ],
        "createdAt": "2023-09-20T18:02:52.975Z",
        "updatedAt": "2023-09-21T18:43:51.666Z",
        "currentHalfInning": null,
        "lastEvent": null
      }
    ]
  }
  
  
  



}
