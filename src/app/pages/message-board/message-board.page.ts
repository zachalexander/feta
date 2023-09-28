import { Component, OnInit, ViewChild, ElementRef, Input, Injectable, QueryList, ViewChildren, OnChanges, AfterViewInit } from '@angular/core';
import { APIService, ModelSortDirection } from 'src/app/API.service';
import { SportsService } from 'src/app/services/sports.service';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';
import { Amplify, Hub } from 'aws-amplify';
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import awsconfig from './../../../aws-exports';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseballChatroomPage } from 'src/app/modals/baseball-chatroom/baseball-chatroom.page';

@Component({
  selector: 'app-message-board',
  templateUrl: 'message-board.page.html',
  styleUrls: ['message-board.page.scss']
})
export class MessageBoardPage implements OnInit {

  onUpdateSportsGame: Subscription | null = null;
  onUpdateHubPost: Subscription | null = null;
  data: any;
  baseballData: any = [];
  hubData: any = [];
  liveData: any = [];
  currentData: any = [];
  lastEvent: any = [];
  lastEventDescription;
  opponentName;
  currentHalfInning;
  mobilePlatform;

  testData: any = [];

  priorConnectionState: ConnectionState;

  constructor(
    private api: APIService,
    private sportsService: SportsService,
    private platform: Platform,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController
  ) {
    this.mobilePlatform = this.platform.is("mobile");
  }

  async ngOnInit() {
    this.startSubscriptions();
    await this.getHubData();
    console.log(this.hubData)

    this.testData = {
      "__typename": "SportsGame",
      "id": "716414",
      "sport": "baseball",
      "homeTeam": "Detroit Tigers",
      "awayTeam": "Kansas City Royals",
      "gameStatus": "In Progress",
      "homeTeamWins": "74",
      "homeTeamLosses": "83",
      "awayTeamWins": "54",
      "awayTeamLosses": "103",
      "basicGameInfo": [
        {
          "initialGameData": {
            "venue": {
              "name": "Comerica Park",
              "link": "/api/v1/venues/2394",
              "timeZone": {
                "offset": -4,
                "tz": "EDT",
                "offsetAtGameTime": -4,
                "id": "America/Detroit"
              },
              "active": true,
              "season": "2023",
              "location": {
                "elevation": 600,
                "country": "USA",
                "city": "Detroit",
                "phone": "(313) 471-2000",
                "address1": "2100 Woodward Avenue",
                "postalCode": "48201",
                "defaultCoordinates": {
                  "latitude": 42.3391151,
                  "longitude": -83.048695
                },
                "state": "Michigan",
                "azimuthAngle": 150,
                "stateAbbrev": "MI"
              },
              "id": 2394,
              "fieldInfo": {
                "turfType": "Grass",
                "leftCenter": 370,
                "leftLine": 345,
                "rightCenter": 365,
                "rightLine": 330,
                "roofType": "Open",
                "center": 420,
                "capacity": 41083
              }
            },
            "game": {
              "doubleHeader": "N",
              "calendarEventID": "14-716414-2023-09-28",
              "gameNumber": 1,
              "season": "2023",
              "pk": 716414,
              "id": "2023/09/27/kcamlb-detmlb-1",
              "tiebreaker": "N",
              "type": "R",
              "gamedayType": "P",
              "seasonDisplay": "2023"
            },
            "officialScorer": {
              "link": "/api/v1/people/494624",
              "fullName": "Adam Liberman",
              "id": 494624
            },
            "teams": {
              "away": {
                "teamName": "Royals",
                "venue": {
                  "name": "Kauffman Stadium",
                  "link": "/api/v1/venues/7",
                  "id": 7
                },
                "locationName": "Kansas City",
                "firstYearOfPlay": "1968",
                "league": {
                  "name": "American League",
                  "link": "/api/v1/league/103",
                  "id": 103
                },
                "clubName": "Royals",
                "link": "/api/v1/teams/118",
                "teamCode": "kca",
                "fileCode": "kc",
                "active": true,
                "allStarStatus": "N",
                "springVenue": {
                  "link": "/api/v1/venues/2603",
                  "id": 2603
                },
                "abbreviation": "KC",
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
                  "wins": 54,
                  "conferenceGamesBack": "-",
                  "records": {},
                  "springLeagueGamesBack": "-",
                  "leagueGamesBack": "-",
                  "divisionLeader": false,
                  "losses": 103,
                  "wildCardGamesBack": "-",
                  "sportGamesBack": "-",
                  "leagueRecord": {
                    "wins": 54,
                    "pct": ".344",
                    "ties": 0,
                    "losses": 103
                  },
                  "gamesPlayed": 157,
                  "winningPercentage": ".344"
                },
                "name": "Kansas City Royals",
                "season": 2023,
                "id": 118,
                "shortName": "Kansas City",
                "sport": {
                  "link": "/api/v1/sports/1",
                  "name": "Major League Baseball",
                  "id": 1
                },
                "franchiseName": "Kansas City"
              },
              "home": {
                "teamName": "Tigers",
                "venue": {
                  "name": "Comerica Park",
                  "link": "/api/v1/venues/2394",
                  "id": 2394
                },
                "locationName": "Detroit",
                "firstYearOfPlay": "1901",
                "league": {
                  "name": "American League",
                  "link": "/api/v1/league/103",
                  "id": 103
                },
                "clubName": "Tigers",
                "link": "/api/v1/teams/116",
                "teamCode": "det",
                "fileCode": "det",
                "active": true,
                "allStarStatus": "N",
                "springVenue": {
                  "link": "/api/v1/venues/2511",
                  "id": 2511
                },
                "abbreviation": "DET",
                "springLeague": {
                  "name": "Grapefruit League",
                  "link": "/api/v1/league/115",
                  "id": 115,
                  "abbreviation": "GL"
                },
                "division": {
                  "name": "American League Central",
                  "link": "/api/v1/divisions/202",
                  "id": 202
                },
                "record": {
                  "divisionGamesBack": "-",
                  "wins": 74,
                  "conferenceGamesBack": "-",
                  "records": {},
                  "springLeagueGamesBack": "-",
                  "leagueGamesBack": "-",
                  "divisionLeader": false,
                  "losses": 83,
                  "wildCardGamesBack": "-",
                  "sportGamesBack": "-",
                  "leagueRecord": {
                    "wins": 74,
                    "pct": ".471",
                    "ties": 0,
                    "losses": 83
                  },
                  "gamesPlayed": 157,
                  "winningPercentage": ".471"
                },
                "name": "Detroit Tigers",
                "season": 2023,
                "id": 116,
                "shortName": "Detroit",
                "sport": {
                  "link": "/api/v1/sports/1",
                  "name": "Major League Baseball",
                  "id": 1
                },
                "franchiseName": "Detroit"
              }
            },
            "players": {
              "ID666142": {
                "isPlayer": true,
                "lastInitName": "Ragans, C",
                "lastName": "Ragans",
                "birthStateProvince": "FL",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2022-08-04",
                "link": "/api/v1/people/666142",
                "nameFirstLast": "Cole Ragans",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 25,
                "firstLastName": "Cole Ragans",
                "lastFirstName": "Ragans, Cole",
                "birthCountry": "USA",
                "useName": "Cole",
                "id": 666142,
                "fullFMLName": "Cole Gatlin Ragans",
                "height": "6' 4\"",
                "nameSlug": "cole-ragans-666142",
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "draftYear": 2016,
                "boxscoreName": "Ragans",
                "fullName": "Cole Ragans",
                "weight": 190,
                "active": true,
                "birthCity": "Crawfordville",
                "initLastName": "C Ragans",
                "strikeZoneTop": 3.549,
                "birthDate": "1997-12-12",
                "primaryNumber": "55",
                "firstName": "Cole",
                "fullLFMName": "Ragans, Cole Gatlin",
                "useLastName": "Ragans",
                "middleName": "Gatlin",
                "strikeZoneBottom": 1.627,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID593958": {
                "isPlayer": true,
                "lastInitName": "Rodriguez, E",
                "lastName": "Rodriguez",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2015-05-28",
                "link": "/api/v1/people/593958",
                "nameFirstLast": "Eduardo Rodriguez",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 30,
                "firstLastName": "Eduardo Rodriguez",
                "lastFirstName": "Rodriguez, Eduardo",
                "birthCountry": "Venezuela",
                "useName": "Eduardo",
                "id": 593958,
                "fullFMLName": "Eduardo Jose Rodriguez",
                "height": "6' 2\"",
                "nameMatrilineal": "Hernandez",
                "nameSlug": "eduardo-rodriguez-593958",
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "nickName": "El Gualo",
                "boxscoreName": "Rodriguez, Ed",
                "fullName": "Eduardo Rodriguez",
                "weight": 231,
                "active": true,
                "birthCity": "Valencia",
                "initLastName": "E Rodriguez",
                "strikeZoneTop": 3.467,
                "birthDate": "1993-04-07",
                "primaryNumber": "57",
                "firstName": "Eduardo",
                "fullLFMName": "Rodriguez, Eduardo Jose",
                "useLastName": "Rodriguez",
                "middleName": "Jose",
                "strikeZoneBottom": 1.589,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID622766": {
                "isPlayer": true,
                "lastInitName": "Díaz, M",
                "lastName": "Diaz",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2017-04-03",
                "link": "/api/v1/people/622766",
                "nameFirstLast": "Miguel Diaz",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 28,
                "firstLastName": "Miguel Díaz",
                "lastFirstName": "Díaz, Miguel",
                "birthCountry": "Dominican Republic",
                "useName": "Miguel",
                "id": 622766,
                "fullFMLName": "Miguel Angel Díaz",
                "height": "6' 0\"",
                "nameSlug": "miguel-diaz-622766",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "boxscoreName": "Díaz, M",
                "fullName": "Miguel Diaz",
                "weight": 224,
                "active": true,
                "birthCity": "San Cristobal",
                "initLastName": "M Díaz",
                "strikeZoneTop": 3.371,
                "birthDate": "1994-11-28",
                "primaryNumber": "58",
                "firstName": "Miguel",
                "fullLFMName": "Díaz, Miguel Angel",
                "useLastName": "Díaz",
                "middleName": "Angel",
                "strikeZoneBottom": 1.535,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID669373": {
                "isPlayer": true,
                "lastInitName": "Skubal, T",
                "lastName": "Skubal",
                "birthStateProvince": "CA",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2020-08-18",
                "link": "/api/v1/people/669373",
                "nameFirstLast": "Tarik Skubal",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 26,
                "firstLastName": "Tarik Skubal",
                "lastFirstName": "Skubal, Tarik",
                "birthCountry": "USA",
                "useName": "Tarik",
                "id": 669373,
                "fullFMLName": "Tarik Daniel Skubal",
                "height": "6' 3\"",
                "nameSlug": "tarik-skubal-669373",
                "pronunciation": "Tare-ick sku-ble",
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "draftYear": 2018,
                "boxscoreName": "Skubal",
                "fullName": "Tarik Skubal",
                "weight": 240,
                "active": true,
                "birthCity": "Hayward",
                "initLastName": "T Skubal",
                "strikeZoneTop": 3.49,
                "birthDate": "1996-11-20",
                "primaryNumber": "29",
                "firstName": "Tarik",
                "fullLFMName": "Skubal, Tarik Daniel",
                "useLastName": "Skubal",
                "middleName": "Daniel",
                "strikeZoneBottom": 1.601,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID681857": {
                "isPlayer": true,
                "lastInitName": "Olson, R",
                "lastName": "Olson",
                "birthStateProvince": "GA",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2023-06-02",
                "link": "/api/v1/people/681857",
                "nameFirstLast": "Reese Olson",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 24,
                "firstLastName": "Reese Olson",
                "lastFirstName": "Olson, Reese",
                "birthCountry": "USA",
                "useName": "Reese",
                "id": 681857,
                "fullFMLName": "Reese Olson",
                "height": "6' 1\"",
                "nameSlug": "reese-olson-681857",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2018,
                "boxscoreName": "Olson",
                "fullName": "Reese Olson",
                "weight": 160,
                "active": true,
                "birthCity": "Gainesville",
                "initLastName": "R Olson",
                "strikeZoneTop": 3.411,
                "birthDate": "1999-07-31",
                "primaryNumber": "45",
                "firstName": "Reese",
                "fullLFMName": "Olson, Reese",
                "useLastName": "Olson",
                "strikeZoneBottom": 1.565,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID689225": {
                "isPlayer": true,
                "lastInitName": "Brieske, B",
                "lastName": "Brieske",
                "birthStateProvince": "AZ",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2022-04-23",
                "link": "/api/v1/people/689225",
                "nameFirstLast": "Beau Brieske",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 25,
                "firstLastName": "Beau Brieske",
                "lastFirstName": "Brieske, Beau",
                "birthCountry": "USA",
                "useName": "Beau",
                "id": 689225,
                "fullFMLName": "Beau Brieske",
                "height": "6' 3\"",
                "nameSlug": "beau-brieske-689225",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2019,
                "boxscoreName": "Brieske",
                "fullName": "Beau Brieske",
                "weight": 200,
                "active": true,
                "birthCity": "Chandler",
                "initLastName": "B Brieske",
                "strikeZoneTop": 3.49,
                "birthDate": "1998-04-04",
                "primaryNumber": "4",
                "firstName": "Beau",
                "fullLFMName": "Brieske, Beau ",
                "useLastName": "Brieske",
                "strikeZoneBottom": 1.601,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID663947": {
                "isPlayer": true,
                "lastInitName": "Holton, T",
                "lastName": "Holton",
                "birthStateProvince": "FL",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2022-04-28",
                "link": "/api/v1/people/663947",
                "nameFirstLast": "Tyler Holton",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 27,
                "firstLastName": "Tyler Holton",
                "lastFirstName": "Holton, Tyler",
                "birthCountry": "USA",
                "useName": "Tyler",
                "id": 663947,
                "fullFMLName": "Tyler  Holton",
                "height": "6' 2\"",
                "nameSlug": "tyler-holton-663947",
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "draftYear": 2018,
                "boxscoreName": "Holton, T",
                "fullName": "Tyler Holton",
                "weight": 200,
                "active": true,
                "birthCity": "Tallahassee",
                "initLastName": "T Holton",
                "strikeZoneTop": 3.467,
                "birthDate": "1996-06-13",
                "primaryNumber": "87",
                "firstName": "Tyler",
                "fullLFMName": "Holton, Tyler",
                "useLastName": "Holton",
                "strikeZoneBottom": 1.589,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID608348": {
                "isPlayer": true,
                "lastInitName": "Kelly, C",
                "lastName": "Kelly",
                "birthStateProvince": "IL",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2016-09-05",
                "link": "/api/v1/people/608348",
                "nameFirstLast": "Carson Kelly",
                "primaryPosition": {
                  "code": "2",
                  "name": "Catcher",
                  "type": "Catcher",
                  "abbreviation": "C"
                },
                "currentAge": 29,
                "firstLastName": "Carson Kelly",
                "lastFirstName": "Kelly, Carson",
                "birthCountry": "USA",
                "useName": "Carson",
                "id": 608348,
                "fullFMLName": "Carson Franklin Kelly",
                "height": "6' 2\"",
                "nameSlug": "carson-kelly-608348",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "nickName": "Cars",
                "draftYear": 2012,
                "boxscoreName": "Kelly, C",
                "fullName": "Carson Kelly",
                "weight": 212,
                "active": true,
                "birthCity": "Chicago",
                "initLastName": "C Kelly",
                "strikeZoneTop": 3.28,
                "birthDate": "1994-07-14",
                "primaryNumber": "15",
                "firstName": "Carson",
                "fullLFMName": "Kelly, Carson Franklin",
                "useLastName": "Kelly",
                "middleName": "Franklin",
                "strikeZoneBottom": 1.62,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID663704": {
                "isPlayer": true,
                "lastInitName": "McArthur, J",
                "lastName": "McArthur",
                "birthStateProvince": "TX",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2023-06-28",
                "link": "/api/v1/people/663704",
                "nameFirstLast": "James McArthur",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 26,
                "firstLastName": "James McArthur",
                "lastFirstName": "McArthur, James",
                "birthCountry": "USA",
                "useName": "James",
                "id": 663704,
                "fullFMLName": "James L. McArthur",
                "height": "6' 7\"",
                "nameSlug": "james-mcarthur-663704",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2018,
                "boxscoreName": "McArthur",
                "fullName": "James McArthur",
                "weight": 230,
                "active": true,
                "birthCity": "New Braunfels",
                "initLastName": "J McArthur",
                "strikeZoneTop": 3.756,
                "birthDate": "1996-12-11",
                "primaryNumber": "66",
                "firstName": "James",
                "fullLFMName": "McArthur, James L.",
                "useLastName": "McArthur",
                "middleName": "L.",
                "strikeZoneBottom": 1.746,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID670097": {
                "isPlayer": true,
                "lastInitName": "Short, Z",
                "lastName": "Short",
                "birthStateProvince": "NY",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2021-04-21",
                "link": "/api/v1/people/670097",
                "nameFirstLast": "Zack Short",
                "primaryPosition": {
                  "code": "4",
                  "name": "Second Base",
                  "type": "Infielder",
                  "abbreviation": "2B"
                },
                "currentAge": 28,
                "firstLastName": "Zack Short",
                "lastFirstName": "Short, Zack",
                "birthCountry": "USA",
                "useName": "Zack",
                "id": 670097,
                "fullFMLName": "Zachary Ryan Short",
                "height": "5' 10\"",
                "nameSlug": "zack-short-670097",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2016,
                "boxscoreName": "Short",
                "fullName": "Zack Short",
                "weight": 180,
                "active": true,
                "birthCity": "Kingston",
                "initLastName": "Z Short",
                "strikeZoneTop": 3.28,
                "birthDate": "1995-05-29",
                "primaryNumber": "59",
                "firstName": "Zachary",
                "fullLFMName": "Short, Zachary Ryan",
                "useLastName": "Short",
                "middleName": "Ryan",
                "strikeZoneBottom": 1.57,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID671221": {
                "isPlayer": true,
                "lastInitName": "Waters, D",
                "lastName": "Waters",
                "birthStateProvince": "GA",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2022-08-22",
                "link": "/api/v1/people/671221",
                "nameFirstLast": "Drew Waters",
                "primaryPosition": {
                  "code": "8",
                  "name": "Outfielder",
                  "type": "Outfielder",
                  "abbreviation": "CF"
                },
                "currentAge": 24,
                "firstLastName": "Drew Waters",
                "lastFirstName": "Waters, Drew",
                "birthCountry": "USA",
                "useName": "Drew",
                "id": 671221,
                "fullFMLName": "Andrew David Waters",
                "height": "6' 0\"",
                "nameSlug": "drew-waters-671221",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2017,
                "boxscoreName": "Waters",
                "fullName": "Drew Waters",
                "weight": 185,
                "active": true,
                "birthCity": "Atlanta",
                "initLastName": "D Waters",
                "strikeZoneTop": 3.54,
                "birthDate": "1998-12-30",
                "primaryNumber": "6",
                "firstName": "Andrew",
                "fullLFMName": "Waters, Andrew David",
                "useLastName": "Waters",
                "middleName": "David",
                "strikeZoneBottom": 1.7,
                "batSide": {
                  "code": "S",
                  "description": "Switch"
                }
              },
              "ID671345": {
                "isPlayer": true,
                "lastInitName": "Foley, J",
                "lastName": "Foley",
                "birthStateProvince": "NY",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2021-06-06",
                "link": "/api/v1/people/671345",
                "nameFirstLast": "Jason Foley",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 27,
                "firstLastName": "Jason Foley",
                "lastFirstName": "Foley, Jason",
                "birthCountry": "USA",
                "useName": "Jason",
                "id": 671345,
                "fullFMLName": "Jason Joseph Foley",
                "height": "6' 4\"",
                "nameSlug": "jason-foley-671345",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "boxscoreName": "Foley",
                "fullName": "Jason Foley",
                "weight": 215,
                "active": true,
                "birthCity": "Manhasset",
                "initLastName": "J Foley",
                "strikeZoneTop": 3.549,
                "birthDate": "1995-11-01",
                "primaryNumber": "68",
                "firstName": "Jason",
                "fullLFMName": "Foley, Jason Joseph",
                "useLastName": "Foley",
                "middleName": "Joseph",
                "strikeZoneBottom": 1.627,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID622259": {
                "isPlayer": true,
                "lastInitName": "Wingenter, T",
                "lastName": "Wingenter",
                "birthStateProvince": "AL",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2018-08-07",
                "link": "/api/v1/people/622259",
                "nameFirstLast": "Trey Wingenter",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 29,
                "firstLastName": "Trey Wingenter",
                "lastFirstName": "Wingenter, Trey",
                "birthCountry": "USA",
                "useName": "Trey",
                "id": 622259,
                "fullFMLName": "Anthony James Wingenter",
                "height": "6' 7\"",
                "nameSlug": "trey-wingenter-622259",
                "pronunciation": "WING-enter",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "nickName": "Terry",
                "draftYear": 2015,
                "boxscoreName": "Wingenter",
                "fullName": "Trey Wingenter",
                "weight": 237,
                "active": true,
                "birthCity": "Huntsville",
                "initLastName": "T Wingenter",
                "strikeZoneTop": 3.756,
                "birthDate": "1994-04-15",
                "primaryNumber": "62",
                "firstName": "Anthony",
                "fullLFMName": "Wingenter, Anthony James",
                "useLastName": "Wingenter",
                "middleName": "James",
                "strikeZoneBottom": 1.746,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID672578": {
                "isPlayer": true,
                "lastInitName": "Hernández, C",
                "lastName": "Hernandez",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2020-09-01",
                "link": "/api/v1/people/672578",
                "nameFirstLast": "Carlos Hernandez",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 26,
                "firstLastName": "Carlos Hernández",
                "lastFirstName": "Hernández, Carlos",
                "birthCountry": "Venezuela",
                "useName": "Carlos",
                "id": 672578,
                "fullFMLName": "Carlos Eduardo Hernández",
                "height": "6' 4\"",
                "nameMatrilineal": "Pino",
                "nameSlug": "carlos-hernandez-672578",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "boxscoreName": "Hernández, C",
                "fullName": "Carlos Hernandez",
                "weight": 255,
                "active": true,
                "birthCity": "Guayana",
                "initLastName": "C Hernández",
                "strikeZoneTop": 3.549,
                "birthDate": "1997-03-11",
                "primaryNumber": "43",
                "firstName": "Carlos",
                "fullLFMName": "Hernández, Carlos Eduardo",
                "useLastName": "Hernández",
                "middleName": "Eduardo",
                "strikeZoneBottom": 1.627,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID687830": {
                "isPlayer": true,
                "lastInitName": "Gipson-Long, S",
                "lastName": "Gipson-Long",
                "birthStateProvince": "GA",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2023-09-10",
                "link": "/api/v1/people/687830",
                "nameFirstLast": "Sawyer Gipson-Long",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 25,
                "firstLastName": "Sawyer Gipson-Long",
                "lastFirstName": "Gipson-Long, Sawyer",
                "birthCountry": "USA",
                "useName": "Sawyer",
                "id": 687830,
                "fullFMLName": "Alec Sawyer Gipson-Long",
                "height": "6' 4\"",
                "nameSlug": "sawyer-gipson-long-687830",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2019,
                "boxscoreName": "Gipson-Long",
                "fullName": "Sawyer Gipson-Long",
                "weight": 225,
                "active": true,
                "birthCity": "Lithia Springs",
                "initLastName": "S Gipson-Long",
                "strikeZoneTop": 3.549,
                "birthDate": "1997-12-12",
                "primaryNumber": "66",
                "firstName": "Alec",
                "fullLFMName": "Gipson-Long, Alec Sawyer",
                "useLastName": "Gipson-Long",
                "middleName": "Sawyer",
                "strikeZoneBottom": 1.627,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID680118": {
                "isPlayer": true,
                "lastInitName": "Blanco, D",
                "lastName": "Blanco",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2022-05-20",
                "link": "/api/v1/people/680118",
                "nameFirstLast": "Dairon Blanco",
                "primaryPosition": {
                  "code": "7",
                  "name": "Outfielder",
                  "type": "Outfielder",
                  "abbreviation": "LF"
                },
                "currentAge": 30,
                "firstLastName": "Dairon Blanco",
                "lastFirstName": "Blanco, Dairon",
                "birthCountry": "Cuba",
                "useName": "Dairon",
                "id": 680118,
                "fullFMLName": "Dairon  Blanco",
                "height": "5' 11\"",
                "nameMatrilineal": "Lamadrid",
                "nameSlug": "dairon-blanco-680118",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "boxscoreName": "Blanco",
                "fullName": "Dairon Blanco",
                "weight": 200,
                "active": true,
                "birthCity": "Florida",
                "initLastName": "D Blanco",
                "strikeZoneTop": 3.39,
                "birthDate": "1993-04-26",
                "primaryNumber": "44",
                "firstName": "Dairon",
                "fullLFMName": "Blanco, Dairon",
                "useLastName": "Blanco",
                "strikeZoneBottom": 1.57,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID668731": {
                "isPlayer": true,
                "lastInitName": "Baddoo, A",
                "lastName": "Baddoo",
                "birthStateProvince": "MD",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2021-04-04",
                "link": "/api/v1/people/668731",
                "nameFirstLast": "Akil Baddoo",
                "primaryPosition": {
                  "code": "7",
                  "name": "Outfielder",
                  "type": "Outfielder",
                  "abbreviation": "LF"
                },
                "currentAge": 25,
                "firstLastName": "Akil Baddoo",
                "lastFirstName": "Baddoo, Akil",
                "birthCountry": "USA",
                "useName": "Akil",
                "id": 668731,
                "fullFMLName": "Akil Neomon Baddoo",
                "height": "6' 1\"",
                "nameSlug": "akil-baddoo-668731",
                "pronunciation": "ah-KEEL bah-DOO",
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "draftYear": 2016,
                "boxscoreName": "Baddoo",
                "fullName": "Akil Baddoo",
                "weight": 214,
                "active": true,
                "birthCity": "Silver Spring",
                "initLastName": "A Baddoo",
                "strikeZoneTop": 3.58,
                "birthDate": "1998-08-16",
                "primaryNumber": "60",
                "firstName": "Akil",
                "fullLFMName": "Baddoo, Akil Neomon",
                "useLastName": "Baddoo",
                "middleName": "Neomon",
                "strikeZoneBottom": 1.7,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID664728": {
                "isPlayer": true,
                "lastInitName": "Isbel, K",
                "lastName": "Isbel",
                "birthStateProvince": "CA",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2021-04-01",
                "link": "/api/v1/people/664728",
                "nameFirstLast": "Kyle Isbel",
                "primaryPosition": {
                  "code": "8",
                  "name": "Outfielder",
                  "type": "Outfielder",
                  "abbreviation": "CF"
                },
                "currentAge": 26,
                "firstLastName": "Kyle Isbel",
                "lastFirstName": "Isbel, Kyle",
                "birthCountry": "USA",
                "useName": "Kyle",
                "id": 664728,
                "fullFMLName": "Kyle Grant Isbel",
                "height": "5' 11\"",
                "nameSlug": "kyle-isbel-664728",
                "pronunciation": "IZZ-bell",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2018,
                "boxscoreName": "Isbel",
                "fullName": "Kyle Isbel",
                "weight": 190,
                "active": true,
                "birthCity": "Fontana",
                "initLastName": "K Isbel",
                "strikeZoneTop": 3.35,
                "birthDate": "1997-03-03",
                "primaryNumber": "28",
                "firstName": "Kyle",
                "fullLFMName": "Isbel, Kyle Grant",
                "useLastName": "Isbel",
                "middleName": "Grant",
                "strikeZoneBottom": 1.58,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID663837": {
                "isPlayer": true,
                "lastInitName": "Vierling, M",
                "lastName": "Vierling",
                "birthStateProvince": "MO",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2021-06-19",
                "link": "/api/v1/people/663837",
                "nameFirstLast": "Matt Vierling",
                "primaryPosition": {
                  "code": "9",
                  "name": "Outfielder",
                  "type": "Outfielder",
                  "abbreviation": "RF"
                },
                "currentAge": 27,
                "firstLastName": "Matt Vierling",
                "lastFirstName": "Vierling, Matt",
                "birthCountry": "USA",
                "useName": "Matt",
                "id": 663837,
                "fullFMLName": "Matthew Gregory Vierling",
                "height": "6' 3\"",
                "nameSlug": "matt-vierling-663837",
                "pronunciation": "VEER-ling",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2018,
                "boxscoreName": "Vierling",
                "fullName": "Matt Vierling",
                "weight": 205,
                "active": true,
                "birthCity": "St. Louis",
                "initLastName": "M Vierling",
                "strikeZoneTop": 3.49,
                "birthDate": "1996-09-16",
                "primaryNumber": "8",
                "firstName": "Matthew",
                "fullLFMName": "Vierling, Matthew Gregory",
                "useLastName": "Vierling",
                "middleName": "Gregory",
                "strikeZoneBottom": 1.69,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID656353": {
                "isPlayer": true,
                "lastInitName": "Davidson, T",
                "lastName": "Davidson",
                "birthStateProvince": "TX",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2020-09-26",
                "link": "/api/v1/people/656353",
                "nameFirstLast": "Tucker Davidson",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 27,
                "firstLastName": "Tucker Davidson",
                "lastFirstName": "Davidson, Tucker",
                "birthCountry": "USA",
                "useName": "Tucker",
                "id": 656353,
                "fullFMLName": "Joseph Tucker Davidson",
                "height": "6' 2\"",
                "nameSlug": "tucker-davidson-656353",
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "draftYear": 2016,
                "boxscoreName": "Davidson",
                "fullName": "Tucker Davidson",
                "weight": 215,
                "active": true,
                "birthCity": "Amarillo",
                "initLastName": "T Davidson",
                "strikeZoneTop": 3.467,
                "birthDate": "1996-03-25",
                "primaryNumber": "41",
                "firstName": "Joseph",
                "fullLFMName": "Davidson, Joseph Tucker",
                "useLastName": "Davidson",
                "middleName": "Tucker",
                "strikeZoneBottom": 1.589,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID672580": {
                "isPlayer": true,
                "lastInitName": "Garcia, M",
                "lastName": "Garcia",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2022-07-15",
                "link": "/api/v1/people/672580",
                "nameFirstLast": "Maikel Garcia",
                "primaryPosition": {
                  "code": "5",
                  "name": "Third Base",
                  "type": "Infielder",
                  "abbreviation": "3B"
                },
                "currentAge": 23,
                "firstLastName": "Maikel Garcia",
                "lastFirstName": "Garcia, Maikel",
                "birthCountry": "Venezuela",
                "useName": "Maikel",
                "id": 672580,
                "fullFMLName": "Maikel Jose Garcia",
                "height": "6' 0\"",
                "nameMatrilineal": "Escobar",
                "nameSlug": "maikel-garcia-672580",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "boxscoreName": "Garcia, M",
                "fullName": "Maikel Garcia",
                "weight": 180,
                "active": true,
                "birthCity": "La Sabana",
                "initLastName": "M Garcia",
                "strikeZoneTop": 3.51,
                "birthDate": "2000-03-03",
                "primaryNumber": "11",
                "firstName": "Maikel",
                "fullLFMName": "Garcia, Maikel Jose",
                "useLastName": "Garcia",
                "middleName": "Jose",
                "strikeZoneBottom": 1.7,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID672582": {
                "isPlayer": true,
                "lastInitName": "Zerpa, A",
                "lastName": "Zerpa",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2021-09-30",
                "link": "/api/v1/people/672582",
                "nameFirstLast": "Angel Zerpa",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 24,
                "firstLastName": "Angel Zerpa",
                "lastFirstName": "Zerpa, Angel",
                "birthCountry": "Venezuela",
                "useName": "Angel",
                "id": 672582,
                "fullFMLName": "Angel David Zerpa",
                "height": "6' 0\"",
                "nameMatrilineal": "Palacios",
                "nameSlug": "angel-zerpa-672582",
                "pronunciation": "AHN-hel SAIR-pah",
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "boxscoreName": "Zerpa",
                "fullName": "Angel Zerpa",
                "weight": 220,
                "active": true,
                "birthCity": "Valle de la Pascua",
                "initLastName": "A Zerpa",
                "strikeZoneTop": 3.371,
                "birthDate": "1999-09-27",
                "primaryNumber": "61",
                "firstName": "Angel",
                "fullLFMName": "Zerpa, Angel David",
                "useLastName": "Zerpa",
                "middleName": "David",
                "strikeZoneBottom": 1.535,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID542585": {
                "isPlayer": true,
                "lastInitName": "Cisnero, J",
                "lastName": "Cisnero",
                "birthStateProvince": "San Cristobal",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2013-04-22",
                "link": "/api/v1/people/542585",
                "nameFirstLast": "Jose Cisnero",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 34,
                "firstLastName": "José Cisnero",
                "lastFirstName": "Cisnero, José",
                "birthCountry": "Dominican Republic",
                "useName": "Jose",
                "id": 542585,
                "fullFMLName": "José Luis Cisnero",
                "height": "6' 3\"",
                "nameSlug": "jose-cisnero-542585",
                "pronunciation": "sis-nare-oh",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "nickName": "Gui",
                "boxscoreName": "Cisnero",
                "fullName": "Jose Cisnero",
                "weight": 258,
                "active": true,
                "birthCity": "Bajos de Haina",
                "initLastName": "J Cisnero",
                "strikeZoneTop": 3.49,
                "birthDate": "1989-04-11",
                "primaryNumber": "67",
                "firstName": "Jose",
                "fullLFMName": "Cisnero, José Luis",
                "useLastName": "Cisnero",
                "middleName": "Luis",
                "strikeZoneBottom": 1.601,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID656638": {
                "isPlayer": true,
                "lastInitName": "Lange, A",
                "lastName": "Lange",
                "birthStateProvince": "CA",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2021-04-10",
                "link": "/api/v1/people/656638",
                "nameFirstLast": "Alex Lange",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 27,
                "firstLastName": "Alex Lange",
                "lastFirstName": "Lange, Alex",
                "birthCountry": "USA",
                "useName": "Alex",
                "id": 656638,
                "fullFMLName": "Alex Craig Lange",
                "height": "6' 3\"",
                "nameSlug": "alex-lange-656638",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2017,
                "boxscoreName": "Lange",
                "fullName": "Alex Lange",
                "weight": 202,
                "active": true,
                "birthCity": "Riverside",
                "initLastName": "A Lange",
                "strikeZoneTop": 3.49,
                "birthDate": "1995-10-02",
                "primaryNumber": "55",
                "firstName": "Alexander",
                "fullLFMName": "Lange, Alex Craig",
                "useLastName": "Lange",
                "middleName": "Craig",
                "strikeZoneBottom": 1.601,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID678009": {
                "isPlayer": true,
                "lastInitName": "Meadows, P",
                "lastName": "Meadows",
                "birthStateProvince": "GA",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2023-08-21",
                "link": "/api/v1/people/678009",
                "nameFirstLast": "Parker Meadows",
                "primaryPosition": {
                  "code": "8",
                  "name": "Outfielder",
                  "type": "Outfielder",
                  "abbreviation": "CF"
                },
                "currentAge": 23,
                "firstLastName": "Parker Meadows",
                "lastFirstName": "Meadows, Parker",
                "birthCountry": "USA",
                "useName": "Parker",
                "id": 678009,
                "fullFMLName": "Parker  Meadows",
                "height": "6' 5\"",
                "nameSlug": "parker-meadows-678009",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2018,
                "boxscoreName": "Meadows, P",
                "fullName": "Parker Meadows",
                "weight": 205,
                "active": true,
                "birthCity": "Atlanta",
                "initLastName": "P Meadows",
                "strikeZoneTop": 3.46,
                "birthDate": "1999-11-02",
                "primaryNumber": "22",
                "firstName": "Parker",
                "fullLFMName": "Meadows, Parker",
                "useLastName": "Meadows",
                "strikeZoneBottom": 1.65,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID543475": {
                "isPlayer": true,
                "lastInitName": "Lyles, J",
                "lastName": "Lyles",
                "birthStateProvince": "SC",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2011-05-31",
                "link": "/api/v1/people/543475",
                "nameFirstLast": "Jordan Lyles",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 32,
                "firstLastName": "Jordan Lyles",
                "lastFirstName": "Lyles, Jordan",
                "birthCountry": "USA",
                "useName": "Jordan",
                "id": 543475,
                "fullFMLName": "Jordan Horton Lyles",
                "height": "6' 5\"",
                "nameSlug": "jordan-lyles-543475",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "nickName": "J Lyles",
                "draftYear": 2008,
                "boxscoreName": "Lyles",
                "fullName": "Jordan Lyles",
                "weight": 230,
                "active": true,
                "birthCity": "Hartsville",
                "initLastName": "J Lyles",
                "strikeZoneTop": 3.575,
                "birthDate": "1990-10-19",
                "primaryNumber": "24",
                "firstName": "Jordan",
                "fullLFMName": "Lyles, Jordan Horton",
                "useLastName": "Lyles",
                "middleName": "Horton",
                "strikeZoneBottom": 1.681,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID674444": {
                "isPlayer": true,
                "lastInitName": "Cruz, S",
                "lastName": "Cruz",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2023-08-29",
                "link": "/api/v1/people/674444",
                "nameFirstLast": "Steven Cruz",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 24,
                "firstLastName": "Steven Cruz",
                "lastFirstName": "Cruz, Steven",
                "birthCountry": "Dominican Republic",
                "useName": "Steven",
                "id": 674444,
                "fullFMLName": "Steven Adalberto Cruz",
                "height": "6' 7\"",
                "nameMatrilineal": "Rosario",
                "nameSlug": "steven-cruz-674444",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "boxscoreName": "Cruz",
                "fullName": "Steven Cruz",
                "weight": 225,
                "active": true,
                "birthCity": "Tenares",
                "initLastName": "S Cruz",
                "strikeZoneTop": 3.756,
                "birthDate": "1999-06-15",
                "primaryNumber": "64",
                "firstName": "Steven",
                "fullLFMName": "Cruz, Steven Adalberto",
                "useLastName": "Cruz",
                "middleName": "Adalberto",
                "strikeZoneBottom": 1.746,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID677951": {
                "isPlayer": true,
                "lastInitName": "Witt Jr., B",
                "lastName": "Witt",
                "birthStateProvince": "TX",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2022-04-07",
                "link": "/api/v1/people/677951",
                "nameFirstLast": "Bobby Witt Jr.",
                "nameSuffix": "Jr.",
                "primaryPosition": {
                  "code": "6",
                  "name": "Shortstop",
                  "type": "Infielder",
                  "abbreviation": "SS"
                },
                "currentAge": 23,
                "firstLastName": "Bobby Witt Jr.",
                "lastFirstName": "Witt Jr., Bobby",
                "birthCountry": "USA",
                "useName": "Bobby",
                "id": 677951,
                "fullFMLName": "Robert Andrew Witt Jr.",
                "height": "6' 1\"",
                "nameSlug": "bobby-witt-jr-677951",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2019,
                "nameTitle": "Jr.",
                "boxscoreName": "Witt Jr.",
                "fullName": "Bobby Witt Jr.",
                "weight": 200,
                "active": true,
                "birthCity": "Colleyville",
                "initLastName": "B Witt Jr.",
                "strikeZoneTop": 3.49,
                "birthDate": "2000-06-14",
                "primaryNumber": "7",
                "firstName": "Robert",
                "fullLFMName": "Witt Jr., Robert Andrew",
                "useLastName": "Witt Jr.",
                "middleName": "Andrew",
                "strikeZoneBottom": 1.66,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID656716": {
                "isPlayer": true,
                "lastInitName": "McKinstry, Z",
                "lastName": "McKinstry",
                "birthStateProvince": "OH",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2020-09-16",
                "link": "/api/v1/people/656716",
                "nameFirstLast": "Zach McKinstry",
                "primaryPosition": {
                  "code": "9",
                  "name": "Outfielder",
                  "type": "Outfielder",
                  "abbreviation": "RF"
                },
                "currentAge": 28,
                "firstLastName": "Zach McKinstry",
                "lastFirstName": "McKinstry, Zach",
                "birthCountry": "USA",
                "useName": "Zach",
                "id": 656716,
                "fullFMLName": "Zachary McKinstry",
                "height": "6' 0\"",
                "nameSlug": "zach-mckinstry-656716",
                "pronunciation": "muh-KIN-stry",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2016,
                "boxscoreName": "McKinstry",
                "fullName": "Zach McKinstry",
                "weight": 180,
                "active": true,
                "birthCity": "Toledo",
                "initLastName": "Z McKinstry",
                "strikeZoneTop": 3.3,
                "birthDate": "1995-04-29",
                "primaryNumber": "39",
                "firstName": "Zachary",
                "fullLFMName": "McKinstry, Zachary",
                "useLastName": "McKinstry",
                "strikeZoneBottom": 1.58,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID686531": {
                "isPlayer": true,
                "lastInitName": "Lipcius, A",
                "lastName": "Lipcius",
                "birthStateProvince": "MD",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2023-09-01",
                "link": "/api/v1/people/686531",
                "nameFirstLast": "Andre Lipcius",
                "primaryPosition": {
                  "code": "4",
                  "name": "Second Base",
                  "type": "Infielder",
                  "abbreviation": "2B"
                },
                "currentAge": 25,
                "firstLastName": "Andre Lipcius",
                "lastFirstName": "Lipcius, Andre",
                "birthCountry": "USA",
                "useName": "Andre",
                "id": 686531,
                "fullFMLName": "Andre Martinas Lipcius",
                "height": "6' 0\"",
                "nameSlug": "andre-lipcius-686531",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2019,
                "boxscoreName": "Lipcius",
                "fullName": "Andre Lipcius",
                "weight": 190,
                "active": true,
                "birthCity": "Annapolis",
                "initLastName": "A Lipcius",
                "strikeZoneTop": 3.44,
                "birthDate": "1998-05-22",
                "primaryNumber": "27",
                "firstName": "Andre",
                "fullLFMName": "Lipcius, Andre Martinas",
                "useLastName": "Lipcius",
                "middleName": "Martinas",
                "strikeZoneBottom": 1.62,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID676092": {
                "isPlayer": true,
                "lastInitName": "Snider, C",
                "lastName": "Snider",
                "birthStateProvince": "TN",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2022-04-09",
                "link": "/api/v1/people/676092",
                "nameFirstLast": "Collin Snider",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 27,
                "firstLastName": "Collin Snider",
                "lastFirstName": "Snider, Collin",
                "birthCountry": "USA",
                "useName": "Collin",
                "id": 676092,
                "fullFMLName": "Collin Kenneth Snider",
                "height": "6' 4\"",
                "nameSlug": "collin-snider-676092",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2017,
                "boxscoreName": "Snider",
                "fullName": "Collin Snider",
                "weight": 195,
                "active": true,
                "birthCity": "Nashville",
                "initLastName": "C Snider",
                "strikeZoneTop": 3.549,
                "birthDate": "1995-10-10",
                "primaryNumber": "40",
                "firstName": "Collin",
                "fullLFMName": "Snider, Collin Kenneth",
                "useLastName": "Snider",
                "middleName": "Kenneth",
                "strikeZoneBottom": 1.627,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID680742": {
                "isPlayer": true,
                "lastInitName": "Bowlan, J",
                "lastName": "Bowlan",
                "birthStateProvince": "TN",
                "gender": "M",
                "isVerified": false,
                "link": "/api/v1/people/680742",
                "nameFirstLast": "Jonathan Bowlan",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 26,
                "firstLastName": "Jonathan Bowlan",
                "lastFirstName": "Bowlan, Jonathan",
                "birthCountry": "USA",
                "useName": "Jonathan",
                "id": 680742,
                "fullFMLName": "Jonathan  Bowlan",
                "height": "6' 6\"",
                "nameSlug": "jonathan-bowlan-680742",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2018,
                "boxscoreName": "Bowlan",
                "fullName": "Jonathan Bowlan",
                "weight": 240,
                "active": true,
                "birthCity": "Arlington",
                "initLastName": "J Bowlan",
                "strikeZoneTop": 3.656,
                "birthDate": "1996-12-01",
                "primaryNumber": "62",
                "firstName": "Jonathan",
                "fullLFMName": "Bowlan, Jonathan",
                "useLastName": "Bowlan",
                "strikeZoneBottom": 1.677,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID595879": {
                "isPlayer": true,
                "lastInitName": "Báez, J",
                "lastName": "Baez",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2014-08-05",
                "link": "/api/v1/people/595879",
                "nameFirstLast": "Javier Baez",
                "primaryPosition": {
                  "code": "6",
                  "name": "Shortstop",
                  "type": "Infielder",
                  "abbreviation": "SS"
                },
                "currentAge": 30,
                "firstLastName": "Javier Báez",
                "lastFirstName": "Báez, Javier",
                "birthCountry": "Puerto Rico",
                "useName": "Javier",
                "id": 595879,
                "fullFMLName": "Ednel Javier Báez",
                "height": "6' 0\"",
                "nameSlug": "javier-baez-595879",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "nickName": "El Mago",
                "draftYear": 2011,
                "boxscoreName": "Báez, J",
                "fullName": "Javier Baez",
                "weight": 190,
                "active": true,
                "birthCity": "Bayamon",
                "initLastName": "J Báez",
                "strikeZoneTop": 3.54,
                "birthDate": "1992-12-01",
                "primaryNumber": "28",
                "firstName": "Ednel",
                "fullLFMName": "Báez, Ednel Javier",
                "useLastName": "Báez",
                "middleName": "Javier",
                "strikeZoneBottom": 1.75,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID425844": {
                "isPlayer": true,
                "lastInitName": "Greinke, Z",
                "lastName": "Greinke",
                "birthStateProvince": "FL",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2004-05-22",
                "link": "/api/v1/people/425844",
                "nameFirstLast": "Zack Greinke",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 39,
                "firstLastName": "Zack Greinke",
                "lastFirstName": "Greinke, Zack",
                "birthCountry": "USA",
                "useName": "Zack",
                "id": 425844,
                "fullFMLName": "Donald Zackary Greinke",
                "height": "6' 2\"",
                "nameSlug": "zack-greinke-425844",
                "pronunciation": "GRAYN-kee",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2002,
                "boxscoreName": "Greinke",
                "fullName": "Zack Greinke",
                "weight": 200,
                "active": true,
                "birthCity": "Orlando",
                "initLastName": "Z Greinke",
                "strikeZoneTop": 3.467,
                "birthDate": "1983-10-21",
                "primaryNumber": "23",
                "firstName": "Donald",
                "fullLFMName": "Greinke, Donald Zackary",
                "useLastName": "Greinke",
                "middleName": "Zackary",
                "strikeZoneBottom": 1.589,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID521692": {
                "isPlayer": true,
                "lastInitName": "Perez, S",
                "lastName": "Perez",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2011-08-10",
                "link": "/api/v1/people/521692",
                "nameFirstLast": "Salvador Perez",
                "primaryPosition": {
                  "code": "2",
                  "name": "Catcher",
                  "type": "Catcher",
                  "abbreviation": "C"
                },
                "currentAge": 33,
                "firstLastName": "Salvador Perez",
                "lastFirstName": "Perez, Salvador",
                "birthCountry": "Venezuela",
                "useName": "Salvador",
                "id": 521692,
                "fullFMLName": "Salvador Johan Perez",
                "height": "6' 3\"",
                "nameMatrilineal": "Diaz",
                "nameSlug": "salvador-perez-521692",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "nickName": "El Nino",
                "boxscoreName": "Perez, S",
                "fullName": "Salvador Perez",
                "weight": 255,
                "active": true,
                "birthCity": "Valencia",
                "initLastName": "S Perez",
                "strikeZoneTop": 3.51,
                "birthDate": "1990-05-10",
                "primaryNumber": "13",
                "firstName": "Salvador",
                "fullLFMName": "Perez, Salvador Johan",
                "useLastName": "Perez",
                "middleName": "Johan",
                "strikeZoneBottom": 1.59,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID663804": {
                "isPlayer": true,
                "lastInitName": "Kowar, J",
                "lastName": "Kowar",
                "birthStateProvince": "NC",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2021-06-07",
                "link": "/api/v1/people/663804",
                "nameFirstLast": "Jackson Kowar",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 26,
                "firstLastName": "Jackson Kowar",
                "lastFirstName": "Kowar, Jackson",
                "birthCountry": "USA",
                "useName": "Jackson",
                "id": 663804,
                "fullFMLName": "Jackson Alexander Kowar",
                "height": "6' 5\"",
                "nameSlug": "jackson-kowar-663804",
                "pronunciation": "coh-wahr",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2018,
                "boxscoreName": "Kowar",
                "fullName": "Jackson Kowar",
                "weight": 200,
                "active": true,
                "birthCity": "Weddington",
                "initLastName": "J Kowar",
                "strikeZoneTop": 3.575,
                "birthDate": "1996-10-04",
                "primaryNumber": "37",
                "firstName": "Jackson",
                "fullLFMName": "Kowar, Jackson Alexander",
                "useLastName": "Kowar",
                "middleName": "Alexander",
                "strikeZoneBottom": 1.681,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID658668": {
                "isPlayer": true,
                "lastInitName": "Olivares, E",
                "lastName": "Olivares",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2020-07-25",
                "link": "/api/v1/people/658668",
                "nameFirstLast": "Edward Olivares",
                "primaryPosition": {
                  "code": "7",
                  "name": "Outfielder",
                  "type": "Outfielder",
                  "abbreviation": "LF"
                },
                "currentAge": 27,
                "firstLastName": "Edward Olivares",
                "lastFirstName": "Olivares, Edward",
                "birthCountry": "Venezuela",
                "useName": "Edward",
                "id": 658668,
                "fullFMLName": "Edward Daniel Olivares",
                "height": "6' 2\"",
                "nameMatrilineal": "Nunez",
                "nameSlug": "edward-olivares-658668",
                "pronunciation": "oh-lee-VAH-res",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "boxscoreName": "Olivares",
                "fullName": "Edward Olivares",
                "weight": 190,
                "active": true,
                "birthCity": "Caracas",
                "initLastName": "E Olivares",
                "strikeZoneTop": 3.58,
                "birthDate": "1996-03-06",
                "primaryNumber": "14",
                "firstName": "Edward",
                "fullLFMName": "Olivares, Edward Daniel",
                "useLastName": "Olivares",
                "middleName": "Daniel",
                "strikeZoneBottom": 1.72,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID681481": {
                "isPlayer": true,
                "lastInitName": "Carpenter, K",
                "lastName": "Carpenter",
                "birthStateProvince": "FL",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2022-08-10",
                "link": "/api/v1/people/681481",
                "nameFirstLast": "Kerry Carpenter",
                "primaryPosition": {
                  "code": "9",
                  "name": "Outfielder",
                  "type": "Outfielder",
                  "abbreviation": "RF"
                },
                "currentAge": 26,
                "firstLastName": "Kerry Carpenter",
                "lastFirstName": "Carpenter, Kerry",
                "birthCountry": "USA",
                "useName": "Kerry",
                "id": 681481,
                "fullFMLName": "Kerry William Carpenter",
                "height": "6' 2\"",
                "nameSlug": "kerry-carpenter-681481",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2019,
                "boxscoreName": "Carpenter, K",
                "fullName": "Kerry Carpenter",
                "weight": 220,
                "active": true,
                "birthCity": "Eustis",
                "initLastName": "K Carpenter",
                "strikeZoneTop": 3.35,
                "birthDate": "1997-09-02",
                "primaryNumber": "30",
                "firstName": "Kerry",
                "fullLFMName": "Carpenter, Kerry William",
                "useLastName": "Carpenter",
                "middleName": "William",
                "strikeZoneBottom": 1.6,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID663527": {
                "isPlayer": true,
                "lastInitName": "Nevin, T",
                "lastName": "Nevin",
                "birthStateProvince": "CA",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2021-05-29",
                "link": "/api/v1/people/663527",
                "nameFirstLast": "Tyler Nevin",
                "primaryPosition": {
                  "code": "5",
                  "name": "Third Base",
                  "type": "Infielder",
                  "abbreviation": "3B"
                },
                "currentAge": 26,
                "firstLastName": "Tyler Nevin",
                "lastFirstName": "Nevin, Tyler",
                "birthCountry": "USA",
                "useName": "Tyler",
                "id": 663527,
                "fullFMLName": "Tyler Joseph Nevin",
                "height": "6' 4\"",
                "nameSlug": "tyler-nevin-663527",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2015,
                "boxscoreName": "Nevin",
                "fullName": "Tyler Nevin",
                "weight": 225,
                "active": true,
                "birthCity": "Poway",
                "initLastName": "T Nevin",
                "strikeZoneTop": 3.61,
                "birthDate": "1997-05-29",
                "primaryNumber": "18",
                "firstName": "Tyler",
                "fullLFMName": "Nevin, Tyler Joseph",
                "useLastName": "Nevin",
                "middleName": "Joseph",
                "strikeZoneBottom": 1.7,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID679845": {
                "isPlayer": true,
                "lastInitName": "Loftin, N",
                "lastName": "Loftin",
                "birthStateProvince": "TX",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2023-09-01",
                "link": "/api/v1/people/679845",
                "nameFirstLast": "Nick Loftin",
                "primaryPosition": {
                  "code": "6",
                  "name": "Shortstop",
                  "type": "Infielder",
                  "abbreviation": "SS"
                },
                "currentAge": 25,
                "firstLastName": "Nick Loftin",
                "lastFirstName": "Loftin, Nick",
                "birthCountry": "USA",
                "useName": "Nick",
                "id": 679845,
                "fullFMLName": "Nicholas James Loftin",
                "height": "5' 11\"",
                "nameSlug": "nick-loftin-679845",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2020,
                "boxscoreName": "Loftin",
                "fullName": "Nick Loftin",
                "weight": 180,
                "active": true,
                "birthCity": "Corpus Christi",
                "initLastName": "N Loftin",
                "strikeZoneTop": 3.43,
                "birthDate": "1998-09-25",
                "primaryNumber": "12",
                "firstName": "Nicholas",
                "fullLFMName": "Loftin, Nicholas James",
                "useLastName": "Loftin",
                "middleName": "James",
                "strikeZoneBottom": 1.59,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID679529": {
                "isPlayer": true,
                "lastInitName": "Torkelson, S",
                "lastName": "Torkelson",
                "birthStateProvince": "CA",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2022-04-08",
                "link": "/api/v1/people/679529",
                "nameFirstLast": "Spencer Torkelson",
                "primaryPosition": {
                  "code": "3",
                  "name": "First Base",
                  "type": "Infielder",
                  "abbreviation": "1B"
                },
                "currentAge": 24,
                "firstLastName": "Spencer Torkelson",
                "lastFirstName": "Torkelson, Spencer",
                "birthCountry": "USA",
                "useName": "Spencer",
                "id": 679529,
                "fullFMLName": "Spencer Enochs Torkelson",
                "height": "6' 1\"",
                "nameSlug": "spencer-torkelson-679529",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2020,
                "boxscoreName": "Torkelson",
                "fullName": "Spencer Torkelson",
                "weight": 220,
                "active": true,
                "birthCity": "Petaluma",
                "initLastName": "S Torkelson",
                "strikeZoneTop": 3.46,
                "birthDate": "1999-08-26",
                "primaryNumber": "20",
                "firstName": "Spencer",
                "fullLFMName": "Torkelson, Spencer Enochs",
                "useLastName": "Torkelson",
                "middleName": "Enochs",
                "strikeZoneBottom": 1.61,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID679525": {
                "isPlayer": true,
                "lastInitName": "Marsh, A",
                "lastName": "Marsh",
                "birthStateProvince": "WI",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2023-06-30",
                "link": "/api/v1/people/679525",
                "nameFirstLast": "Alec Marsh",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 25,
                "firstLastName": "Alec Marsh",
                "lastFirstName": "Marsh, Alec",
                "birthCountry": "USA",
                "useName": "Alec",
                "id": 679525,
                "fullFMLName": "Alec Tylar Michael Marsh",
                "height": "6' 2\"",
                "nameSlug": "alec-marsh-679525",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2019,
                "boxscoreName": "Marsh",
                "fullName": "Alec Marsh",
                "weight": 220,
                "active": true,
                "birthCity": "Milwaukee",
                "initLastName": "A Marsh",
                "strikeZoneTop": 3.467,
                "birthDate": "1998-05-14",
                "primaryNumber": "67",
                "firstName": "Alec",
                "fullLFMName": "Marsh, Alec Tylar Michael",
                "useLastName": "Marsh",
                "middleName": "Tylar Michael",
                "strikeZoneBottom": 1.589,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID669004": {
                "isPlayer": true,
                "lastInitName": "Melendez, M",
                "lastName": "Melendez",
                "birthStateProvince": "FL",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2022-05-03",
                "link": "/api/v1/people/669004",
                "nameFirstLast": "MJ Melendez",
                "nameSuffix": "Jr.",
                "primaryPosition": {
                  "code": "9",
                  "name": "Outfielder",
                  "type": "Outfielder",
                  "abbreviation": "RF"
                },
                "currentAge": 24,
                "firstLastName": "MJ Melendez",
                "lastFirstName": "Melendez, MJ",
                "birthCountry": "USA",
                "useName": "MJ",
                "id": 669004,
                "fullFMLName": "Mervyl S. Melendez",
                "height": "6' 1\"",
                "nameSlug": "mj-melendez-669004",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2017,
                "nameTitle": "Jr.",
                "boxscoreName": "Melendez",
                "fullName": "MJ Melendez",
                "weight": 190,
                "active": true,
                "birthCity": "Daytona Beach",
                "initLastName": "M Melendez",
                "strikeZoneTop": 3.31,
                "birthDate": "1998-11-29",
                "primaryNumber": "1",
                "firstName": "Mervyl",
                "fullLFMName": "Melendez, Mervyl S.",
                "useLastName": "Melendez",
                "middleName": "S.",
                "strikeZoneBottom": 1.62,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID668472": {
                "isPlayer": true,
                "lastInitName": "Pratto, N",
                "lastName": "Pratto",
                "birthStateProvince": "CA",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2022-07-14",
                "link": "/api/v1/people/668472",
                "nameFirstLast": "Nick Pratto",
                "primaryPosition": {
                  "code": "3",
                  "name": "First Base",
                  "type": "Infielder",
                  "abbreviation": "1B"
                },
                "currentAge": 24,
                "firstLastName": "Nick Pratto",
                "lastFirstName": "Pratto, Nick",
                "birthCountry": "USA",
                "useName": "Nick",
                "id": 668472,
                "fullFMLName": "Nicholas Michael Pratto",
                "height": "6' 1\"",
                "nameSlug": "nick-pratto-668472",
                "pronunciation": "praw-toh",
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "draftYear": 2017,
                "boxscoreName": "Pratto",
                "fullName": "Nick Pratto",
                "weight": 225,
                "active": true,
                "birthCity": "Huntington Beach",
                "initLastName": "N Pratto",
                "strikeZoneTop": 3.41,
                "birthDate": "1998-10-06",
                "primaryNumber": "32",
                "firstName": "Nicholas",
                "fullLFMName": "Pratto, Nicholas Michael",
                "useLastName": "Pratto",
                "middleName": "Michael",
                "strikeZoneBottom": 1.61,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID668670": {
                "isPlayer": true,
                "lastInitName": "Rogers, J",
                "lastName": "Rogers",
                "birthStateProvince": "TX",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2019-07-30",
                "link": "/api/v1/people/668670",
                "nameFirstLast": "Jake Rogers",
                "primaryPosition": {
                  "code": "2",
                  "name": "Catcher",
                  "type": "Catcher",
                  "abbreviation": "C"
                },
                "currentAge": 28,
                "firstLastName": "Jake Rogers",
                "lastFirstName": "Rogers, Jake",
                "birthCountry": "USA",
                "useName": "Jake",
                "id": 668670,
                "fullFMLName": "Jacob Ray Rogers",
                "height": "6' 1\"",
                "nameSlug": "jake-rogers-668670",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "nickName": "Rog",
                "draftYear": 2016,
                "boxscoreName": "Rogers",
                "fullName": "Jake Rogers",
                "weight": 201,
                "active": true,
                "birthCity": "Canyon",
                "initLastName": "J Rogers",
                "strikeZoneTop": 3.41,
                "birthDate": "1995-04-18",
                "primaryNumber": "34",
                "firstName": "Jacob",
                "fullLFMName": "Rogers, Jacob Ray",
                "useLastName": "Rogers",
                "middleName": "Ray",
                "strikeZoneBottom": 1.59,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID686681": {
                "isPlayer": true,
                "lastInitName": "Massey, M",
                "lastName": "Massey",
                "birthStateProvince": "IL",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2022-07-15",
                "link": "/api/v1/people/686681",
                "nameFirstLast": "Michael Massey",
                "primaryPosition": {
                  "code": "4",
                  "name": "Second Base",
                  "type": "Infielder",
                  "abbreviation": "2B"
                },
                "currentAge": 25,
                "firstLastName": "Michael Massey",
                "lastFirstName": "Massey, Michael",
                "birthCountry": "USA",
                "useName": "Michael",
                "id": 686681,
                "fullFMLName": "Michael Massey",
                "height": "6' 0\"",
                "nameSlug": "michael-massey-686681",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2019,
                "boxscoreName": "Massey",
                "fullName": "Michael Massey",
                "weight": 195,
                "active": true,
                "birthCity": "Palos Park",
                "initLastName": "M Massey",
                "strikeZoneTop": 3.54,
                "birthDate": "1998-03-22",
                "primaryNumber": "19",
                "firstName": "Michael",
                "fullLFMName": "Massey, Michael ",
                "useLastName": "Massey",
                "strikeZoneBottom": 1.7,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID408234": {
                "isPlayer": true,
                "lastInitName": "Cabrera, M",
                "lastName": "Cabrera",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2003-06-20",
                "link": "/api/v1/people/408234",
                "nameFirstLast": "Miguel Cabrera",
                "primaryPosition": {
                  "code": "10",
                  "name": "Designated Hitter",
                  "type": "Hitter",
                  "abbreviation": "DH"
                },
                "currentAge": 40,
                "firstLastName": "Miguel Cabrera",
                "lastFirstName": "Cabrera, Miguel",
                "birthCountry": "Venezuela",
                "useName": "Miguel",
                "id": 408234,
                "fullFMLName": "Jose Miguel Cabrera",
                "height": "6' 4\"",
                "nameMatrilineal": "Torres",
                "nameSlug": "miguel-cabrera-408234",
                "pronunciation": "Mee-gel Kah-BREH-rah",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "nickName": "Miggy",
                "boxscoreName": "Cabrera, M",
                "fullName": "Miguel Cabrera",
                "weight": 267,
                "active": true,
                "birthCity": "Maracay",
                "initLastName": "M Cabrera",
                "strikeZoneTop": 3.61,
                "birthDate": "1983-04-18",
                "primaryNumber": "24",
                "firstName": "Jose",
                "fullLFMName": "Cabrera, Jose Miguel",
                "useLastName": "Cabrera",
                "middleName": "Miguel",
                "strikeZoneBottom": 1.84,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID682515": {
                "isPlayer": true,
                "lastInitName": "Porter, L",
                "lastName": "Porter",
                "birthStateProvince": "AZ",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2023-09-12",
                "link": "/api/v1/people/682515",
                "nameFirstLast": "Logan Porter",
                "primaryPosition": {
                  "code": "2",
                  "name": "Catcher",
                  "type": "Catcher",
                  "abbreviation": "C"
                },
                "currentAge": 28,
                "firstLastName": "Logan Porter",
                "lastFirstName": "Porter, Logan",
                "birthCountry": "USA",
                "useName": "Logan",
                "id": 682515,
                "fullFMLName": "Logan  Porter",
                "height": "6' 0\"",
                "nameSlug": "logan-porter-682515",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "boxscoreName": "Porter",
                "fullName": "Logan Porter",
                "weight": 200,
                "active": true,
                "birthCity": "Phoenix",
                "initLastName": "L Porter",
                "strikeZoneTop": 3.371,
                "birthDate": "1995-07-12",
                "primaryNumber": "88",
                "firstName": "Logan",
                "fullLFMName": "Porter, Logan ",
                "useLastName": "Porter",
                "strikeZoneBottom": 1.535,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID664199": {
                "isPlayer": true,
                "lastInitName": "Clarke, T",
                "lastName": "Clarke",
                "birthStateProvince": "VA",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2019-04-20",
                "link": "/api/v1/people/664199",
                "nameFirstLast": "Taylor Clarke",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 30,
                "firstLastName": "Taylor Clarke",
                "lastFirstName": "Clarke, Taylor",
                "birthCountry": "USA",
                "useName": "Taylor",
                "id": 664199,
                "fullFMLName": "Taylor James Clarke",
                "height": "6' 4\"",
                "nameSlug": "taylor-clarke-664199",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "nickName": "Clarkey",
                "draftYear": 2015,
                "boxscoreName": "Clarke",
                "fullName": "Taylor Clarke",
                "weight": 217,
                "active": true,
                "birthCity": "Ashburn",
                "initLastName": "T Clarke",
                "strikeZoneTop": 3.549,
                "birthDate": "1993-05-13",
                "primaryNumber": "45",
                "firstName": "Taylor",
                "fullLFMName": "Clarke, Taylor James",
                "useLastName": "Clarke",
                "middleName": "James",
                "strikeZoneBottom": 1.627,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID669724": {
                "isPlayer": true,
                "lastInitName": "Hanifee, B",
                "lastName": "Hanifee",
                "birthStateProvince": "VA",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2023-09-21",
                "link": "/api/v1/people/669724",
                "nameFirstLast": "Brenan Hanifee",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 25,
                "firstLastName": "Brenan Hanifee",
                "lastFirstName": "Hanifee, Brenan",
                "birthCountry": "USA",
                "useName": "Brenan",
                "id": 669724,
                "fullFMLName": "Brenan Hanifee",
                "height": "6' 5\"",
                "nameSlug": "brenan-hanifee-669724",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2016,
                "boxscoreName": "Hanifee",
                "fullName": "Brenan Hanifee",
                "weight": 215,
                "active": true,
                "birthCity": "Harrisonburg",
                "initLastName": "B Hanifee",
                "strikeZoneTop": 3.575,
                "birthDate": "1998-05-29",
                "primaryNumber": "75",
                "firstName": "Brenan",
                "fullLFMName": "Hanifee, Brenan",
                "useLastName": "Hanifee",
                "strikeZoneBottom": 1.681,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID622110": {
                "isPlayer": true,
                "lastInitName": "Duffy, M",
                "lastName": "Duffy",
                "birthStateProvince": "CA",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2014-05-22",
                "link": "/api/v1/people/622110",
                "nameFirstLast": "Matt Duffy",
                "primaryPosition": {
                  "code": "5",
                  "name": "Third Base",
                  "type": "Infielder",
                  "abbreviation": "3B"
                },
                "currentAge": 32,
                "firstLastName": "Matt Duffy",
                "lastFirstName": "Duffy, Matt",
                "birthCountry": "USA",
                "useName": "Matt",
                "id": 622110,
                "fullFMLName": "Matthew Michael Duffy",
                "height": "6' 2\"",
                "nameSlug": "matt-duffy-622110",
                "pronunciation": "mat DUH-fee",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "nickName": "Duffman",
                "draftYear": 2012,
                "boxscoreName": "Duffy",
                "fullName": "Matt Duffy",
                "weight": 190,
                "active": true,
                "birthCity": "Long Beach",
                "initLastName": "M Duffy",
                "strikeZoneTop": 3.45,
                "birthDate": "1991-01-15",
                "primaryNumber": "15",
                "firstName": "Matthew",
                "fullLFMName": "Duffy, Matthew Michael",
                "useLastName": "Duffy",
                "middleName": "Michael",
                "strikeZoneBottom": 1.58,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID666214": {
                "isPlayer": true,
                "lastInitName": "Wentz, J",
                "lastName": "Wentz",
                "birthStateProvince": "KS",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2022-05-11",
                "link": "/api/v1/people/666214",
                "nameFirstLast": "Joey Wentz",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 25,
                "firstLastName": "Joey Wentz",
                "lastFirstName": "Wentz, Joey",
                "birthCountry": "USA",
                "useName": "Joey",
                "id": 666214,
                "fullFMLName": "Joseph Barrett Wentz",
                "height": "6' 5\"",
                "nameSlug": "joey-wentz-666214",
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "draftYear": 2016,
                "boxscoreName": "Wentz",
                "fullName": "Joey Wentz",
                "weight": 220,
                "active": true,
                "birthCity": "Lawrence",
                "initLastName": "J Wentz",
                "strikeZoneTop": 3.575,
                "birthDate": "1997-10-06",
                "primaryNumber": "43",
                "firstName": "Joseph",
                "fullLFMName": "Wentz, Joseph Barrett",
                "useLastName": "Wentz",
                "middleName": "Barrett",
                "strikeZoneBottom": 1.681,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID685107": {
                "isPlayer": true,
                "lastInitName": "Veneziano, A",
                "lastName": "Veneziano",
                "birthStateProvince": "NJ",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2023-09-26",
                "link": "/api/v1/people/685107",
                "nameFirstLast": "Anthony Veneziano",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 26,
                "firstLastName": "Anthony Veneziano",
                "lastFirstName": "Veneziano, Anthony",
                "birthCountry": "USA",
                "useName": "Anthony",
                "id": 685107,
                "fullFMLName": "Anthony James Veneziano",
                "height": "6' 5\"",
                "nameSlug": "anthony-veneziano-685107",
                "pitchHand": {
                  "code": "L",
                  "description": "Left"
                },
                "draftYear": 2019,
                "boxscoreName": "Veneziano",
                "fullName": "Anthony Veneziano",
                "weight": 205,
                "active": true,
                "birthCity": "Hackettstown",
                "initLastName": "A Veneziano",
                "strikeZoneTop": 3.575,
                "birthDate": "1997-09-01",
                "primaryNumber": "69",
                "firstName": "Anthony",
                "fullLFMName": "Veneziano, Anthony James",
                "useLastName": "Veneziano",
                "middleName": "James",
                "strikeZoneBottom": 1.681,
                "batSide": {
                  "code": "L",
                  "description": "Left"
                }
              },
              "ID628451": {
                "isPlayer": true,
                "lastInitName": "Ibáñez, A",
                "lastName": "Ibanez",
                "gender": "M",
                "isVerified": true,
                "mlbDebutDate": "2021-05-04",
                "link": "/api/v1/people/628451",
                "nameFirstLast": "Andy Ibanez",
                "primaryPosition": {
                  "code": "4",
                  "name": "Second Base",
                  "type": "Infielder",
                  "abbreviation": "2B"
                },
                "currentAge": 30,
                "firstLastName": "Andy Ibáñez",
                "lastFirstName": "Ibáñez, Andy",
                "birthCountry": "Cuba",
                "useName": "Andy",
                "id": 628451,
                "fullFMLName": "Andy Ibáñez",
                "height": "5' 10\"",
                "nameMatrilineal": "Velazquez",
                "nameSlug": "andy-ibanez-628451",
                "pronunciation": "ee-BAHN-yez",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "boxscoreName": "Ibáñez",
                "fullName": "Andy Ibanez",
                "weight": 205,
                "active": true,
                "birthCity": "Havana",
                "initLastName": "A Ibáñez",
                "strikeZoneTop": 3.12,
                "birthDate": "1993-04-03",
                "primaryNumber": "77",
                "firstName": "Andy",
                "fullLFMName": "Ibáñez, Andy",
                "useLastName": "Ibáñez",
                "strikeZoneBottom": 1.48,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID676684": {
                "isPlayer": true,
                "lastInitName": "Vest, W",
                "lastName": "Vest",
                "birthStateProvince": "TX",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2021-04-01",
                "link": "/api/v1/people/676684",
                "nameFirstLast": "Will Vest",
                "primaryPosition": {
                  "code": "1",
                  "name": "Pitcher",
                  "type": "Pitcher",
                  "abbreviation": "P"
                },
                "currentAge": 28,
                "firstLastName": "Will Vest",
                "lastFirstName": "Vest, Will",
                "birthCountry": "USA",
                "useName": "Will",
                "id": 676684,
                "fullFMLName": "William  Vest",
                "height": "6' 0\"",
                "nameSlug": "will-vest-676684",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2017,
                "boxscoreName": "Vest",
                "fullName": "Will Vest",
                "weight": 180,
                "active": true,
                "birthCity": "Houston",
                "initLastName": "W Vest",
                "strikeZoneTop": 3.371,
                "birthDate": "1995-06-06",
                "primaryNumber": "19",
                "firstName": "William",
                "fullLFMName": "Vest, William ",
                "useLastName": "Vest",
                "strikeZoneBottom": 1.535,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              },
              "ID676369": {
                "isPlayer": true,
                "lastInitName": "Velázquez, N",
                "lastName": "Velazquez",
                "gender": "M",
                "isVerified": false,
                "mlbDebutDate": "2022-05-30",
                "link": "/api/v1/people/676369",
                "nameFirstLast": "Nelson Velazquez",
                "primaryPosition": {
                  "code": "9",
                  "name": "Outfielder",
                  "type": "Outfielder",
                  "abbreviation": "RF"
                },
                "currentAge": 24,
                "firstLastName": "Nelson Velázquez",
                "lastFirstName": "Velázquez, Nelson",
                "birthCountry": "Puerto Rico",
                "useName": "Nelson",
                "id": 676369,
                "fullFMLName": "Nelson Javier Velázquez",
                "height": "6' 0\"",
                "nameMatrilineal": "Romero",
                "nameSlug": "nelson-velazquez-676369",
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "draftYear": 2017,
                "boxscoreName": "Velázquez",
                "fullName": "Nelson Velazquez",
                "weight": 190,
                "active": true,
                "birthCity": "Carolina",
                "initLastName": "N Velázquez",
                "strikeZoneTop": 3.46,
                "birthDate": "1998-12-26",
                "primaryNumber": "17",
                "firstName": "Nelson",
                "fullLFMName": "Velázquez, Nelson Javier",
                "useLastName": "Velázquez",
                "middleName": "Javier",
                "strikeZoneBottom": 1.72,
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              }
            },
            "probablePitchers": {
              "away": {
                "link": "/api/v1/people/680742",
                "fullName": "Jonathan Bowlan",
                "id": 680742
              },
              "home": {
                "link": "/api/v1/people/669373",
                "fullName": "Tarik Skubal",
                "id": 669373
              }
            },
            "primaryDatacaster": {
              "link": "/api/v1/people/570881",
              "fullName": "John Malkoski",
              "id": 570881
            },
            "gameInfo": {
              "delayDurationMinutes": 80,
              "firstPitch": "2023-09-28T22:40:00.000Z",
              "gameDurationMinutes": 147
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
              "dateTime": "2023-09-28T17:10:00Z",
              "resumedFromDateTime": "2023-09-27T22:40:00Z",
              "dayNight": "day",
              "ampm": "PM",
              "resumedFromDate": "2023-09-27",
              "originalDate": "2023-09-27",
              "resumeDateTime": "2023-09-28T17:10:00Z",
              "time": "1:10",
              "officialDate": "2023-09-27",
              "resumeDate": "2023-09-28"
            },
            "review": {
              "away": {
                "used": 0,
                "remaining": 1
              },
              "hasChallenges": false,
              "home": {
                "used": 0,
                "remaining": 1
              }
            },
            "weather": {
              "condition": "Overcast",
              "temp": "64",
              "wind": "9 mph, Out To LF"
            },
            "moundVisits": {
              "away": {
                "used": 2,
                "remaining": 3
              },
              "home": {
                "used": 0,
                "remaining": 5
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
              "link": "/api/v1/venues/2394",
              "id": 2394
            }
          },
          "latestPlays": [
            {
              "result": {
                "homeScore": 4,
                "awayScore": 0,
                "rbi": 0,
                "description": "Mound Visit.",
                "isOut": false,
                "eventType": "mound_visit",
                "type": "atBat",
                "event": "Mound Visit"
              },
              "actionIndex": [],
              "runnerIndex": [],
              "pitchIndex": [
                0,
                1
              ],
              "playEndTime": "2023-09-28T17:19:28.376Z",
              "about": {
                "hasOut": false,
                "captivatingIndex": 0,
                "inning": 5,
                "isScoringPlay": false,
                "atBatIndex": 37,
                "startTime": "2023-09-28T17:18:37.014Z",
                "isTopInning": false,
                "endTime": "2023-09-28T17:19:28.376Z",
                "halfInning": "bottom",
                "isComplete": false
              },
              "count": {
                "outs": 1,
                "balls": 2,
                "strikes": 0
              },
              "atBatIndex": 37,
              "runners": [],
              "playEvents": [
                {
                  "playId": "9079e7ba-327d-4465-9f4e-cc4746176041",
                  "pitchData": {
                    "endSpeed": 82.2,
                    "extension": 6.9366466312973465,
                    "breaks": {
                      "spinRate": 2158,
                      "breakHorizontal": -7.6,
                      "breakAngle": 70.8,
                      "breakVertical": -30.1,
                      "breakVerticalInduced": 4.3,
                      "spinDirection": 155
                    },
                    "startSpeed": 89.1,
                    "zone": 14,
                    "plateTime": 0.4227261291558797,
                    "coordinates": {
                      "pfxX": 2.947577523771618,
                      "pX": 1.5275891022437904,
                      "pZ": 2.402090010144677,
                      "pfxZ": 2.488943399219904,
                      "vY0": -129.3952800551744,
                      "vZ0": -1.8975897993363553,
                      "vX0": 10.306161356647307,
                      "z0": 5.27758882735852,
                      "y0": 50.00037610915947,
                      "aX": 5.01259745144724,
                      "aY": 26.08511456413439,
                      "x": 58.77,
                      "x0": -2.883760376556283,
                      "aZ": -27.932321776501134,
                      "y": 173.92
                    },
                    "strikeZoneTop": 3.46,
                    "strikeZoneBottom": 1.61
                  },
                  "isPitch": true,
                  "pitchNumber": 1,
                  "count": {
                    "outs": 1,
                    "balls": 1,
                    "strikes": 0
                  },
                  "index": 0,
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
                  "startTime": "2023-09-28T17:19:01.685Z",
                  "endTime": "2023-09-28T17:19:20.674Z",
                  "type": "pitch"
                },
                {
                  "playId": "c7453757-5b50-435b-9637-37eff181b5c4",
                  "pitchData": {
                    "endSpeed": 86.6,
                    "breaks": {
                      "spinRate": 2258,
                      "breakHorizontal": 8.9,
                      "breakAngle": 56.4,
                      "breakVertical": -14,
                      "breakVerticalInduced": 16.2,
                      "spinDirection": 224
                    },
                    "startSpeed": 96,
                    "zone": 14,
                    "plateTime": 0.3963620551624989,
                    "coordinates": {
                      "pfxX": -6.89965109487358,
                      "pX": 2.0410202044688535,
                      "pZ": 2.4015936230999304,
                      "pfxZ": 9.58324776334951,
                      "vY0": -138.81987947924054,
                      "vZ0": -4.903850759767577,
                      "vX0": 15.280698818437926,
                      "z0": 5.120435095333745,
                      "y0": 50.001787093095906,
                      "aX": -13.306918898734635,
                      "aY": 34.52403600624424,
                      "x": 39.2,
                      "x0": -2.667916950776673,
                      "aZ": -13.691559309984642,
                      "y": 173.94
                    },
                    "strikeZoneTop": 3.46,
                    "strikeZoneBottom": 1.61
                  },
                  "isPitch": true,
                  "pitchNumber": 2,
                  "count": {
                    "outs": 1,
                    "balls": 2,
                    "strikes": 0
                  },
                  "index": 1,
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
                  "startTime": "2023-09-28T17:19:20.674Z",
                  "endTime": "2023-09-28T17:19:28.376Z",
                  "type": "pitch"
                },
                {
                  "isPitch": false,
                  "count": {
                    "outs": 1,
                    "balls": 2,
                    "strikes": 0
                  },
                  "index": 2,
                  "details": {
                    "homeScore": 4,
                    "awayScore": 0,
                    "isScoringPlay": false,
                    "description": "Mound Visit.",
                    "isOut": false,
                    "eventType": "mound_visit",
                    "event": "Mound Visit",
                    "hasReview": false
                  },
                  "startTime": "2023-09-28T17:19:28.376Z",
                  "endTime": "2023-09-28T17:19:28.376Z",
                  "type": "action"
                }
              ],
              "matchup": {
                "splits": {
                  "batter": "vs_RHP",
                  "menOnBase": "Men_On",
                  "pitcher": "vs_RHB"
                },
                "batter": {
                  "link": "/api/v1/people/679529",
                  "fullName": "Spencer Torkelson",
                  "id": 679529
                },
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "batterHotColdZones": [
                  {
                    "temp": "hot",
                    "color": "rgba(214, 41, 52, .55)",
                    "zone": "01",
                    "value": "1.200"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "02",
                    "value": ".864"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "03",
                    "value": ".933"
                  },
                  {
                    "temp": "cool",
                    "color": "rgba(150, 188, 255, .55)",
                    "zone": "04",
                    "value": ".629"
                  },
                  {
                    "temp": "warm",
                    "color": "rgba(234, 147, 153, .55)",
                    "zone": "05",
                    "value": ".976"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "06",
                    "value": ".827"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "07",
                    "value": ".719"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "08",
                    "value": ".857"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "09",
                    "value": ".345"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "11",
                    "value": ".762"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "12",
                    "value": ".348"
                  },
                  {
                    "temp": "lukewarm",
                    "color": "rgba(255, 255, 255, 0.55)",
                    "zone": "13",
                    "value": ".708"
                  },
                  {
                    "temp": "cold",
                    "color": "rgba(6, 90, 238, .55)",
                    "zone": "14",
                    "value": ".410"
                  }
                ],
                "batterHotColdZoneStats": {
                  "stats": [
                    {
                      "splits": [
                        {
                          "stat": {
                            "name": "battingAverage",
                            "zones": [
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "01",
                                "value": ".393"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "02",
                                "value": ".286"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "03",
                                "value": ".333"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "04",
                                "value": ".286"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "05",
                                "value": ".346"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "06",
                                "value": ".240"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "07",
                                "value": ".226"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "08",
                                "value": ".291"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "09",
                                "value": ".130"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "11",
                                "value": ".238"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "12",
                                "value": ".105"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "13",
                                "value": ".133"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "14",
                                "value": ".078"
                              }
                            ]
                          }
                        },
                        {
                          "stat": {
                            "name": "onBasePlusSlugging",
                            "zones": [
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "01",
                                "value": "1.200"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "02",
                                "value": ".864"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "03",
                                "value": ".933"
                              },
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "04",
                                "value": ".629"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "05",
                                "value": ".976"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "06",
                                "value": ".827"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "07",
                                "value": ".719"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "08",
                                "value": ".857"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "09",
                                "value": ".345"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "11",
                                "value": ".762"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "12",
                                "value": ".348"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "13",
                                "value": ".708"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "14",
                                "value": ".410"
                              }
                            ]
                          }
                        },
                        {
                          "stat": {
                            "name": "exitVelocity",
                            "zones": [
                              {
                                "temp": "cool",
                                "color": "rgba(150, 188, 255, .55)",
                                "zone": "01",
                                "value": "87.85"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "02",
                                "value": "96.86"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "03",
                                "value": "98.19"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "04",
                                "value": "86.34"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "05",
                                "value": "97.65"
                              },
                              {
                                "temp": "warm",
                                "color": "rgba(234, 147, 153, .55)",
                                "zone": "06",
                                "value": "92.94"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "07",
                                "value": "90.87"
                              },
                              {
                                "temp": "hot",
                                "color": "rgba(214, 41, 52, .55)",
                                "zone": "08",
                                "value": "96.36"
                              },
                              {
                                "temp": "lukewarm",
                                "color": "rgba(255, 255, 255, 0.55)",
                                "zone": "09",
                                "value": "90.48"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "11",
                                "value": "80.89"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "12",
                                "value": "86.31"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "13",
                                "value": "78.33"
                              },
                              {
                                "temp": "cold",
                                "color": "rgba(6, 90, 238, .55)",
                                "zone": "14",
                                "value": "80.95"
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
                  "link": "/api/v1/people/663837",
                  "fullName": "Matt Vierling",
                  "id": 663837
                },
                "pitcher": {
                  "link": "/api/v1/people/674444",
                  "fullName": "Steven Cruz",
                  "id": 674444
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
                "homeScore": 4,
                "awayScore": 0,
                "rbi": 0,
                "description": "Matt Vierling walks.",
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
                5
              ],
              "playEndTime": "2023-09-28T17:18:34.910Z",
              "about": {
                "hasOut": false,
                "captivatingIndex": 0,
                "inning": 5,
                "isScoringPlay": false,
                "atBatIndex": 36,
                "startTime": "2023-09-28T17:16:43.595Z",
                "isTopInning": false,
                "endTime": "2023-09-28T17:18:34.910Z",
                "hasReview": false,
                "halfInning": "bottom",
                "isComplete": true
              },
              "count": {
                "outs": 1,
                "balls": 4,
                "strikes": 1
              },
              "atBatIndex": 36,
              "runners": [
                {
                  "credits": [],
                  "details": {
                    "playIndex": 5,
                    "responsiblePitcher": null,
                    "earned": false,
                    "rbi": false,
                    "teamUnearned": false,
                    "eventType": "walk",
                    "isScoringEvent": false,
                    "event": "Walk",
                    "runner": {
                      "link": "/api/v1/people/663837",
                      "fullName": "Matt Vierling",
                      "id": 663837
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
                  "playId": "d6abddc7-d1df-4054-97f2-160b283dc0d0",
                  "pitchData": {
                    "endSpeed": 87.6,
                    "extension": 6.744926936449526,
                    "breaks": {
                      "spinRate": 2188,
                      "breakHorizontal": 17.8,
                      "breakAngle": 26.4,
                      "breakVertical": -18.5,
                      "breakVerticalInduced": 11.6,
                      "spinDirection": 226
                    },
                    "startSpeed": 95.6,
                    "zone": 14,
                    "plateTime": 0.3955327323848725,
                    "coordinates": {
                      "pfxX": -11.240740922974176,
                      "pX": 0.45615189889701585,
                      "pZ": 0.31441530780567706,
                      "pfxZ": 7.539535402853201,
                      "vY0": -138.31758550658085,
                      "vZ0": -9.702965979533786,
                      "vX0": 12.796858372580528,
                      "z0": 5.035874702892516,
                      "y0": 50.00441977370308,
                      "aX": -21.8463991884206,
                      "aY": 30.001484897725053,
                      "x": 99.61,
                      "x0": -2.7634818497419458,
                      "aZ": -17.52635369637091,
                      "y": 230.29
                    },
                    "strikeZoneTop": 3.49,
                    "strikeZoneBottom": 1.69
                  },
                  "isPitch": true,
                  "pitchNumber": 1,
                  "count": {
                    "outs": 1,
                    "balls": 1,
                    "strikes": 0
                  },
                  "index": 0,
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
                      "code": "SI",
                      "description": "Sinker"
                    },
                    "trailColor": "rgba(50, 0, 221, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": false
                  },
                  "startTime": "2023-09-28T17:17:06.845Z",
                  "endTime": "2023-09-28T17:17:26.261Z",
                  "type": "pitch"
                },
                {
                  "playId": "342e4ac0-f972-4a8a-b5b8-05ef0d63d702",
                  "pitchData": {
                    "endSpeed": 87.8,
                    "extension": 6.80611045001753,
                    "breaks": {
                      "spinRate": 2133,
                      "breakHorizontal": 11.3,
                      "breakAngle": 36,
                      "breakVertical": -16.9,
                      "breakVerticalInduced": 12.5,
                      "spinDirection": 222
                    },
                    "startSpeed": 97.4,
                    "zone": 14,
                    "plateTime": 0.390536239124077,
                    "coordinates": {
                      "pfxX": -7.873874127286939,
                      "pX": 0.7559781269159688,
                      "pZ": 1.045181101751832,
                      "pfxZ": 7.97995922929093,
                      "vY0": -141.0598107794835,
                      "vZ0": -8.29197991074928,
                      "vX0": 12.375101013908969,
                      "z0": 5.108186289658232,
                      "y0": 50.00581181097956,
                      "aX": -15.634783255663127,
                      "aY": 36.556866045203876,
                      "x": 88.18,
                      "x0": -2.6954944252772655,
                      "aZ": -16.33446938338288,
                      "y": 210.56
                    },
                    "strikeZoneTop": 3.49,
                    "strikeZoneBottom": 1.69
                  },
                  "isPitch": true,
                  "pitchNumber": 2,
                  "count": {
                    "outs": 1,
                    "balls": 2,
                    "strikes": 0
                  },
                  "index": 1,
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
                  "startTime": "2023-09-28T17:17:26.261Z",
                  "endTime": "2023-09-28T17:17:43.018Z",
                  "type": "pitch"
                },
                {
                  "playId": "30e95270-a255-4a1f-aca3-6e2b423b0c7f",
                  "pitchData": {
                    "endSpeed": 87,
                    "extension": 6.837671840860084,
                    "breaks": {
                      "spinRate": 2181,
                      "breakHorizontal": 10,
                      "breakAngle": 49.2,
                      "breakVertical": -14.3,
                      "breakVerticalInduced": 15.5,
                      "spinDirection": 227
                    },
                    "startSpeed": 97.5,
                    "zone": 14,
                    "plateTime": 0.3926314468561074,
                    "coordinates": {
                      "pfxX": -7.600106035444235,
                      "pX": 1.7263170438906539,
                      "pZ": 0.9324040411090795,
                      "pfxZ": 9.866539590218446,
                      "vY0": -140.83502328477218,
                      "vZ0": -8.799050956799324,
                      "vX0": 14.571808419137168,
                      "z0": 4.978050561879544,
                      "y0": 50.005124356880664,
                      "aX": -14.897206087122212,
                      "aY": 39.28636734960054,
                      "x": 51.2,
                      "x0": -2.585903877541373,
                      "aZ": -12.83992998404589,
                      "y": 213.61
                    },
                    "strikeZoneTop": 3.49,
                    "strikeZoneBottom": 1.69
                  },
                  "isPitch": true,
                  "pitchNumber": 3,
                  "count": {
                    "outs": 1,
                    "balls": 3,
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
                  "startTime": "2023-09-28T17:17:43.018Z",
                  "endTime": "2023-09-28T17:18:02.255Z",
                  "type": "pitch"
                },
                {
                  "playId": "ab4037fa-91c2-45e7-a94b-7ec64588ab61",
                  "pitchData": {
                    "endSpeed": 87.4,
                    "extension": 6.763464294467801,
                    "breaks": {
                      "spinRate": 2191,
                      "breakHorizontal": 11,
                      "breakAngle": 37.2,
                      "breakVertical": -13.1,
                      "breakVerticalInduced": 16.3,
                      "spinDirection": 222
                    },
                    "startSpeed": 97.5,
                    "zone": 9,
                    "plateTime": 0.3906148261582407,
                    "coordinates": {
                      "pfxX": -7.79514075752959,
                      "pX": 0.6882509687151195,
                      "pZ": 1.9763047528357793,
                      "pfxZ": 9.827303497513316,
                      "vY0": -141.2252846976751,
                      "vZ0": -6.056078446045783,
                      "vX0": 12.466378558911524,
                      "z0": 4.994131404472987,
                      "y0": 50.00066984680443,
                      "aX": -15.45517293810352,
                      "aY": 37.69952771460314,
                      "x": 90.77,
                      "x0": -2.808271008699939,
                      "aZ": -12.686502794482337,
                      "y": 185.42
                    },
                    "strikeZoneTop": 3.49,
                    "strikeZoneBottom": 1.69
                  },
                  "isPitch": true,
                  "pitchNumber": 4,
                  "count": {
                    "outs": 1,
                    "balls": 3,
                    "strikes": 1
                  },
                  "index": 3,
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
                  "startTime": "2023-09-28T17:18:02.255Z",
                  "endTime": "2023-09-28T17:18:14.524Z",
                  "type": "pitch"
                },
                {
                  "isPitch": false,
                  "count": {
                    "outs": 1,
                    "balls": 3,
                    "strikes": 1
                  },
                  "index": 4,
                  "details": {
                    "homeScore": 4,
                    "awayScore": 0,
                    "isScoringPlay": false,
                    "description": "Batter Timeout.",
                    "isOut": false,
                    "eventType": "batter_timeout",
                    "event": "Batter Timeout",
                    "hasReview": false
                  },
                  "startTime": "2023-09-28T17:18:14.524Z",
                  "endTime": "2023-09-28T17:18:31.117Z",
                  "type": "action",
                  "player": {
                    "link": "/api/v1/people/663837",
                    "id": 663837
                  }
                },
                {
                  "playId": "dc81aba6-e029-4aeb-b08b-a95f796ac9e8",
                  "pitchData": {
                    "endSpeed": 86.8,
                    "extension": 6.785242654635565,
                    "breaks": {
                      "spinRate": 2220,
                      "breakHorizontal": 7.6,
                      "breakAngle": 49.2,
                      "breakVertical": -10.1,
                      "breakVerticalInduced": 19.9,
                      "spinDirection": 218
                    },
                    "startSpeed": 96.8,
                    "zone": 14,
                    "plateTime": 0.39387901256038216,
                    "coordinates": {
                      "pfxX": -6.020114715414994,
                      "pX": 1.4205266196003312,
                      "pZ": 1.6699404430597868,
                      "pfxZ": 12.075343630828945,
                      "vY0": -140.06354153702804,
                      "vZ0": -7.799834141244321,
                      "vX0": 13.256182314527425,
                      "z0": 5.086452987337869,
                      "y0": 50.00578101183189,
                      "aX": -11.742291260392442,
                      "aY": 37.13361074995103,
                      "x": 62.85,
                      "x0": -2.631747042426429,
                      "aZ": -8.629899203809961,
                      "y": 193.69
                    },
                    "strikeZoneTop": 3.49,
                    "strikeZoneBottom": 1.69
                  },
                  "isPitch": true,
                  "pitchNumber": 5,
                  "count": {
                    "outs": 1,
                    "balls": 4,
                    "strikes": 1
                  },
                  "index": 5,
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
                  "startTime": "2023-09-28T17:18:31.117Z",
                  "endTime": "2023-09-28T17:18:34.910Z",
                  "type": "pitch"
                }
              ],
              "matchup": {
                "splits": {
                  "batter": "vs_RHP",
                  "menOnBase": "Men_On",
                  "pitcher": "vs_RHB"
                },
                "batter": {
                  "link": "/api/v1/people/663837",
                  "fullName": "Matt Vierling",
                  "id": 663837
                },
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "batterHotColdZones": [],
                "postOnFirst": {
                  "link": "/api/v1/people/663837",
                  "fullName": "Matt Vierling",
                  "id": 663837
                },
                "pitcher": {
                  "link": "/api/v1/people/674444",
                  "fullName": "Steven Cruz",
                  "id": 674444
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
                "homeScore": 4,
                "awayScore": 0,
                "rbi": 0,
                "description": "Parker Meadows flies out to right fielder Nelson Velazquez.",
                "isOut": true,
                "eventType": "field_out",
                "type": "atBat",
                "event": "Flyout"
              },
              "actionIndex": [
                0
              ],
              "runnerIndex": [
                0
              ],
              "pitchIndex": [
                1,
                2
              ],
              "playEndTime": "2023-09-28T17:16:40.906Z",
              "about": {
                "hasOut": true,
                "captivatingIndex": 0,
                "inning": 5,
                "isScoringPlay": false,
                "atBatIndex": 35,
                "startTime": "2023-09-28T17:16:13.028Z",
                "isTopInning": false,
                "endTime": "2023-09-28T17:16:40.906Z",
                "hasReview": false,
                "halfInning": "bottom",
                "isComplete": true
              },
              "count": {
                "outs": 1,
                "balls": 0,
                "strikes": 1
              },
              "atBatIndex": 35,
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
                      "credit": "f_putout",
                      "player": {
                        "link": "/api/v1/people/676369",
                        "id": 676369
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
                    "event": "Flyout",
                    "runner": {
                      "link": "/api/v1/people/678009",
                      "fullName": "Parker Meadows",
                      "id": 678009
                    },
                    "movementReason": null
                  },
                  "movement": {
                    "outNumber": 1,
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
                    "outs": 0,
                    "balls": 0,
                    "strikes": 0
                  },
                  "index": 0,
                  "details": {
                    "homeScore": 4,
                    "awayScore": 0,
                    "isScoringPlay": false,
                    "description": "Pitching Change: Steven Cruz replaces Angel Zerpa.",
                    "isOut": false,
                    "eventType": "pitching_substitution",
                    "event": "Pitching Substitution",
                    "hasReview": false
                  },
                  "startTime": "2023-09-28T17:14:37.133Z",
                  "endTime": "2023-09-28T17:16:16.028Z",
                  "isSubstitution": true,
                  "position": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "type": "action",
                  "player": {
                    "link": "/api/v1/people/674444",
                    "id": 674444
                  }
                },
                {
                  "playId": "74189e92-7782-49c7-acb0-06abf6cd29f1",
                  "pitchData": {
                    "endSpeed": 88.4,
                    "extension": 6.6680620415716465,
                    "breaks": {
                      "spinRate": 2233,
                      "breakHorizontal": 8.4,
                      "breakAngle": 39.6,
                      "breakVertical": -13,
                      "breakVerticalInduced": 16.2,
                      "spinDirection": 218
                    },
                    "startSpeed": 97.7,
                    "zone": 9,
                    "plateTime": 0.388137083044346,
                    "coordinates": {
                      "pfxX": -6.105082532039514,
                      "pX": 0.746403296341111,
                      "pZ": 1.960747088955598,
                      "pfxZ": 9.718291148659038,
                      "vY0": -141.66249001902452,
                      "vZ0": -6.695438793452421,
                      "vX0": 11.766538454765753,
                      "z0": 5.178491737611014,
                      "y0": 50.0032386025752,
                      "aX": -12.2857842729127,
                      "aY": 35.392969047343065,
                      "x": 88.55,
                      "x0": -2.686823315286094,
                      "aZ": -12.61951861613131,
                      "y": 185.84
                    },
                    "strikeZoneTop": 3.46,
                    "strikeZoneBottom": 1.65
                  },
                  "isPitch": true,
                  "pitchNumber": 1,
                  "count": {
                    "outs": 0,
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
                  "startTime": "2023-09-28T17:16:16.028Z",
                  "endTime": "2023-09-28T17:16:31.751Z",
                  "type": "pitch"
                },
                {
                  "playId": "ba2673d6-8a7b-4208-bfa4-ac8082209d19",
                  "pitchData": {
                    "endSpeed": 83.6,
                    "extension": 6.830692916162124,
                    "breaks": {
                      "spinRate": 2112,
                      "breakHorizontal": -6,
                      "breakAngle": 55.2,
                      "breakVertical": -25.3,
                      "breakVerticalInduced": 7.3,
                      "spinDirection": 201
                    },
                    "startSpeed": 91.8,
                    "zone": 6,
                    "plateTime": 0.41184202927301783,
                    "coordinates": {
                      "pfxX": 2.2824364110561173,
                      "pX": 0.5468251777693075,
                      "pZ": 2.560253457170046,
                      "pfxZ": 4.30292446393498,
                      "vY0": -133.39241289278547,
                      "vZ0": -2.611952043420417,
                      "vX0": 8.231264299508249,
                      "z0": 5.332021844960619,
                      "y0": 50.00465322666486,
                      "aX": 4.0811816210400735,
                      "aY": 30.774062976420318,
                      "x": 96.16,
                      "x0": -2.885368479601791,
                      "aZ": -24.483645435487063,
                      "y": 169.65
                    },
                    "strikeZoneTop": 3.46,
                    "strikeZoneBottom": 1.65
                  },
                  "isPitch": true,
                  "pitchNumber": 2,
                  "count": {
                    "outs": 0,
                    "balls": 0,
                    "strikes": 1
                  },
                  "index": 2,
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
                      "coordX": 197.82,
                      "coordY": 122.52
                    },
                    "launchSpeed": 79.4,
                    "location": "9",
                    "totalDistance": 261,
                    "trajectory": "fly_ball",
                    "launchAngle": 44
                  },
                  "startTime": "2023-09-28T17:16:31.751Z",
                  "endTime": "2023-09-28T17:16:40.906Z",
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
                  "link": "/api/v1/people/678009",
                  "fullName": "Parker Meadows",
                  "id": 678009
                },
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "batterHotColdZones": [],
                "pitcher": {
                  "link": "/api/v1/people/674444",
                  "fullName": "Steven Cruz",
                  "id": 674444
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
                "homeScore": 4,
                "awayScore": 0,
                "endInning": "End of top 5th",
                "rbi": 0,
                "description": "Logan Porter called out on strikes.",
                "isOut": true,
                "eventType": "strikeout",
                "type": "atBat",
                "event": "Strikeout"
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
                4
              ],
              "playEndTime": "2023-09-28T17:13:38.399Z",
              "about": {
                "hasOut": true,
                "captivatingIndex": 14,
                "inning": 5,
                "isScoringPlay": false,
                "atBatIndex": 34,
                "startTime": "2023-09-28T17:12:15.284Z",
                "isTopInning": true,
                "endTime": "2023-09-28T17:13:38.399Z",
                "hasReview": false,
                "halfInning": "top",
                "isComplete": true
              },
              "count": {
                "outs": 3,
                "balls": 2,
                "strikes": 3
              },
              "atBatIndex": 34,
              "runners": [
                {
                  "credits": [
                    {
                      "position": {
                        "code": "2",
                        "name": "Catcher",
                        "type": "Catcher",
                        "abbreviation": "C"
                      },
                      "credit": "f_putout",
                      "player": {
                        "link": "/api/v1/people/668670",
                        "id": 668670
                      }
                    }
                  ],
                  "details": {
                    "playIndex": 4,
                    "responsiblePitcher": null,
                    "earned": false,
                    "rbi": false,
                    "teamUnearned": false,
                    "eventType": "strikeout",
                    "isScoringEvent": false,
                    "event": "Strikeout",
                    "runner": {
                      "link": "/api/v1/people/682515",
                      "fullName": "Logan Porter",
                      "id": 682515
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
                  "playId": "58fcffc5-f478-4332-a9ac-48b3d6b9c583",
                  "pitchData": {
                    "endSpeed": 86.6,
                    "extension": 5.8238315954378335,
                    "breaks": {
                      "spinRate": 2244,
                      "breakHorizontal": 13.7,
                      "breakAngle": 2.4,
                      "breakVertical": -20.8,
                      "breakVerticalInduced": 10,
                      "spinDirection": 216
                    },
                    "startSpeed": 94.3,
                    "zone": 14,
                    "plateTime": 0.39929700422334946,
                    "coordinates": {
                      "pfxX": -8.289140391456787,
                      "pX": 0.42536551268210604,
                      "pZ": 1.3572351171763948,
                      "pfxZ": 6.277535675027416,
                      "vY0": -137.09538054724254,
                      "vZ0": -7.636194054129089,
                      "vX0": 6.228205860802274,
                      "z0": 5.5539919951463155,
                      "y0": 50.00128881232237,
                      "aX": -15.801806545507459,
                      "aY": 29.870971401709983,
                      "x": 100.79,
                      "x0": -0.7972000735669518,
                      "aZ": -20.201721951915914,
                      "y": 202.13
                    },
                    "strikeZoneTop": 3.371,
                    "strikeZoneBottom": 1.535
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
                      "code": "C",
                      "description": "Called Strike"
                    },
                    "ballColor": "rgba(170, 21, 11, 1.0)",
                    "code": "C",
                    "description": "Called Strike",
                    "isBall": false,
                    "isOut": false,
                    "type": {
                      "code": "SI",
                      "description": "Sinker"
                    },
                    "trailColor": "rgba(50, 0, 221, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": true
                  },
                  "startTime": "2023-09-28T17:12:33.217Z",
                  "endTime": "2023-09-28T17:12:46.333Z",
                  "type": "pitch"
                },
                {
                  "playId": "bac9c046-3331-4d9d-bb5e-c0e2b2b64268",
                  "pitchData": {
                    "endSpeed": 78.6,
                    "extension": 5.520716875085318,
                    "breaks": {
                      "spinRate": 2414,
                      "breakHorizontal": -1.9,
                      "breakAngle": 28.8,
                      "breakVertical": -37.4,
                      "breakVerticalInduced": 0.1,
                      "spinDirection": 102
                    },
                    "startSpeed": 85.5,
                    "zone": 14,
                    "plateTime": 0.440948338166522,
                    "coordinates": {
                      "pfxX": 0.4601058635885553,
                      "pX": 0.9604055619095719,
                      "pZ": 0.9219252583618216,
                      "pfxZ": 0.5770997451705782,
                      "vY0": -124.43687955889402,
                      "vZ0": -4.940903748987025,
                      "vX0": 4.534703256546054,
                      "z0": 5.538817877088279,
                      "y0": 50.00606230301202,
                      "aX": 0.7178188089575316,
                      "aY": 26.059399622912572,
                      "x": 80.39,
                      "x0": -0.9489938212357076,
                      "aZ": -31.279135427564718,
                      "y": 213.89
                    },
                    "strikeZoneTop": 3.371,
                    "strikeZoneBottom": 1.535
                  },
                  "isPitch": true,
                  "pitchNumber": 2,
                  "count": {
                    "outs": 2,
                    "balls": 1,
                    "strikes": 1
                  },
                  "index": 1,
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
                  "startTime": "2023-09-28T17:12:46.333Z",
                  "endTime": "2023-09-28T17:13:00.621Z",
                  "type": "pitch"
                },
                {
                  "playId": "a18303b5-b5e7-4472-8694-64837cffd3b4",
                  "pitchData": {
                    "endSpeed": 79.2,
                    "extension": 5.5305695069609575,
                    "breaks": {
                      "spinRate": 2383,
                      "breakHorizontal": -7.3,
                      "breakAngle": 33.6,
                      "breakVertical": -38.2,
                      "breakVerticalInduced": -1.2,
                      "spinDirection": 116
                    },
                    "startSpeed": 86.4,
                    "zone": 14,
                    "plateTime": 0.4373526345413925,
                    "coordinates": {
                      "pfxX": 3.625435034630481,
                      "pX": 0.7314422656962242,
                      "pZ": 0.20321271144176692,
                      "pfxZ": 0.08415389063077494,
                      "vY0": -125.69626502056587,
                      "vZ0": -6.384670538570642,
                      "vX0": 3.23083454845067,
                      "z0": 5.408726073525211,
                      "y0": 50.00200168525792,
                      "aX": 5.745132992375393,
                      "aY": 27.752958598086025,
                      "x": 89.12,
                      "x0": -1.045973478918741,
                      "aZ": -32.03924913893988,
                      "y": 233.29
                    },
                    "strikeZoneTop": 3.371,
                    "strikeZoneBottom": 1.535
                  },
                  "isPitch": true,
                  "pitchNumber": 3,
                  "count": {
                    "outs": 2,
                    "balls": 2,
                    "strikes": 1
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
                      "code": "SL",
                      "description": "Slider"
                    },
                    "trailColor": "rgba(0, 0, 254, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": false
                  },
                  "startTime": "2023-09-28T17:13:00.621Z",
                  "endTime": "2023-09-28T17:13:13.648Z",
                  "type": "pitch"
                },
                {
                  "playId": "aa36c6b2-4550-47c2-92fe-48096813c60c",
                  "pitchData": {
                    "endSpeed": 84.8,
                    "extension": 5.580092714665983,
                    "breaks": {
                      "spinRate": 2251,
                      "breakHorizontal": 19.1,
                      "breakAngle": 24,
                      "breakVertical": -24.1,
                      "breakVerticalInduced": 7.3,
                      "spinDirection": 220
                    },
                    "startSpeed": 93.9,
                    "zone": 11,
                    "plateTime": 0.4036313944403429,
                    "coordinates": {
                      "pfxX": -11.041153867144065,
                      "pX": -1.1193660293834207,
                      "pZ": 2.4635184288939413,
                      "pfxZ": 4.4719035402672365,
                      "vY0": -136.56727635153126,
                      "vZ0": -3.8383735769746665,
                      "vX0": 3.397328357826013,
                      "z0": 5.5614015389585365,
                      "y0": 50.00178928291776,
                      "aX": -20.510487574107472,
                      "aY": 34.69835235712136,
                      "x": 159.67,
                      "x0": -0.9578182703778854,
                      "aZ": -23.86491414122015,
                      "y": 172.27
                    },
                    "strikeZoneTop": 3.371,
                    "strikeZoneBottom": 1.535
                  },
                  "isPitch": true,
                  "pitchNumber": 4,
                  "count": {
                    "outs": 2,
                    "balls": 2,
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
                      "code": "SI",
                      "description": "Sinker"
                    },
                    "trailColor": "rgba(50, 0, 221, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": true
                  },
                  "startTime": "2023-09-28T17:13:13.648Z",
                  "endTime": "2023-09-28T17:13:35.312Z",
                  "type": "pitch"
                },
                {
                  "playId": "11c6c944-43a2-4804-ac57-e4fe2a132160",
                  "pitchData": {
                    "endSpeed": 81.2,
                    "extension": 5.6266960359435245,
                    "breaks": {
                      "spinRate": 1801,
                      "breakHorizontal": 17.9,
                      "breakAngle": 6,
                      "breakVertical": -34.1,
                      "breakVerticalInduced": 0.6,
                      "spinDirection": 242
                    },
                    "startSpeed": 89.2,
                    "zone": 8,
                    "plateTime": 0.423775431909974,
                    "coordinates": {
                      "pfxX": -10.689197430694147,
                      "pX": 0.21532602972121556,
                      "pZ": 2.1012798436894577,
                      "pfxZ": 0.597840624141373,
                      "vY0": -129.75068541398215,
                      "vZ0": -3.06602980918443,
                      "vX0": 6.0256818595732184,
                      "z0": 5.697679739707823,
                      "y0": 50.0004335750171,
                      "aX": -18.03994834460991,
                      "aY": 29.695081882076988,
                      "x": 108.79,
                      "x0": -0.7606929731580659,
                      "aZ": -31.161083819957636,
                      "y": 182.05
                    },
                    "strikeZoneTop": 3.371,
                    "strikeZoneBottom": 1.535
                  },
                  "isPitch": true,
                  "pitchNumber": 5,
                  "count": {
                    "outs": 2,
                    "balls": 2,
                    "strikes": 3
                  },
                  "index": 4,
                  "details": {
                    "call": {
                      "code": "C",
                      "description": "Called Strike"
                    },
                    "ballColor": "rgba(170, 21, 11, 1.0)",
                    "code": "C",
                    "description": "Called Strike",
                    "isBall": false,
                    "isOut": true,
                    "type": {
                      "code": "CH",
                      "description": "Changeup"
                    },
                    "trailColor": "rgba(0, 85, 254, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": true
                  },
                  "startTime": "2023-09-28T17:13:35.312Z",
                  "endTime": "2023-09-28T17:13:38.399Z",
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
                  "link": "/api/v1/people/682515",
                  "fullName": "Logan Porter",
                  "id": 682515
                },
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "batterHotColdZones": [],
                "pitcher": {
                  "link": "/api/v1/people/622766",
                  "fullName": "Miguel Diaz",
                  "id": 622766
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
                "homeScore": 4,
                "awayScore": 0,
                "rbi": 0,
                "description": "Drew Waters flies out to center fielder Parker Meadows.",
                "isOut": true,
                "eventType": "field_out",
                "type": "atBat",
                "event": "Flyout"
              },
              "actionIndex": [],
              "runnerIndex": [
                0
              ],
              "pitchIndex": [
                0,
                1
              ],
              "playEndTime": "2023-09-28T17:12:14.142Z",
              "about": {
                "hasOut": true,
                "captivatingIndex": 0,
                "inning": 5,
                "isScoringPlay": false,
                "atBatIndex": 33,
                "startTime": "2023-09-28T17:11:32.358Z",
                "isTopInning": true,
                "endTime": "2023-09-28T17:12:14.142Z",
                "hasReview": false,
                "halfInning": "top",
                "isComplete": true
              },
              "count": {
                "outs": 2,
                "balls": 0,
                "strikes": 1
              },
              "atBatIndex": 33,
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
                        "link": "/api/v1/people/678009",
                        "id": 678009
                      }
                    }
                  ],
                  "details": {
                    "playIndex": 1,
                    "responsiblePitcher": null,
                    "earned": false,
                    "rbi": false,
                    "teamUnearned": false,
                    "eventType": "field_out",
                    "isScoringEvent": false,
                    "event": "Flyout",
                    "runner": {
                      "link": "/api/v1/people/671221",
                      "fullName": "Drew Waters",
                      "id": 671221
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
                }
              ],
              "playEvents": [
                {
                  "playId": "52d1fb53-eee6-4d5e-ae5c-dcdc34a1850e",
                  "pitchData": {
                    "endSpeed": 81.4,
                    "extension": 5.557716595768343,
                    "breaks": {
                      "spinRate": 1670,
                      "breakHorizontal": 17.5,
                      "breakAngle": 2.4,
                      "breakVertical": -31.2,
                      "breakVerticalInduced": 3.5,
                      "spinDirection": 242
                    },
                    "startSpeed": 89,
                    "zone": 14,
                    "plateTime": 0.42402376131512565,
                    "coordinates": {
                      "pfxX": -10.511953251711782,
                      "pX": 0.5353709792401551,
                      "pZ": 1.5536298434250428,
                      "pfxZ": 2.492489007184079,
                      "vY0": -129.42036172616653,
                      "vZ0": -5.234713016383465,
                      "vX0": 6.4617397698261625,
                      "z0": 5.757991444383599,
                      "y0": 50.004971188944324,
                      "aX": -17.74609590810979,
                      "aY": 28.260356000397472,
                      "x": 96.59,
                      "x0": -0.6343191816758915,
                      "aZ": -27.972068110062956,
                      "y": 196.83
                    },
                    "strikeZoneTop": 3.54,
                    "strikeZoneBottom": 1.7
                  },
                  "isPitch": true,
                  "pitchNumber": 1,
                  "count": {
                    "outs": 1,
                    "balls": 0,
                    "strikes": 1
                  },
                  "index": 0,
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
                      "code": "CH",
                      "description": "Changeup"
                    },
                    "trailColor": "rgba(0, 85, 254, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": true
                  },
                  "startTime": "2023-09-28T17:11:50.154Z",
                  "endTime": "2023-09-28T17:12:04.474Z",
                  "type": "pitch"
                },
                {
                  "playId": "d9c810a2-2f67-431e-ac54-73fe7cea886e",
                  "pitchData": {
                    "endSpeed": 82,
                    "extension": 5.533416339241696,
                    "breaks": {
                      "spinRate": 1827,
                      "breakHorizontal": 16.7,
                      "breakAngle": 15.6,
                      "breakVertical": -34.6,
                      "breakVerticalInduced": -0.6,
                      "spinDirection": 236
                    },
                    "startSpeed": 90.1,
                    "zone": 4,
                    "plateTime": 0.419354073041009,
                    "coordinates": {
                      "pfxX": -9.771623339779875,
                      "pX": -0.6716380062779794,
                      "pZ": 2.493461833495002,
                      "pfxZ": -0.1932500153053347,
                      "vY0": -131.0866403000392,
                      "vZ0": -2.160396904955366,
                      "vX0": 3.8343012579433045,
                      "z0": 5.777527526099231,
                      "y0": 50.002210043829514,
                      "aX": -16.844093350119863,
                      "aY": 30.157122058526348,
                      "x": 142.6,
                      "x0": -0.8916925117439043,
                      "aZ": -32.50508441511113,
                      "y": 171.46
                    },
                    "strikeZoneTop": 3.54,
                    "strikeZoneBottom": 1.7
                  },
                  "isPitch": true,
                  "pitchNumber": 2,
                  "count": {
                    "outs": 1,
                    "balls": 0,
                    "strikes": 1
                  },
                  "index": 1,
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
                      "coordX": 138.26,
                      "coordY": 71.78
                    },
                    "launchSpeed": 93.6,
                    "location": "8",
                    "totalDistance": 319,
                    "trajectory": "fly_ball",
                    "launchAngle": 39
                  },
                  "startTime": "2023-09-28T17:12:04.474Z",
                  "endTime": "2023-09-28T17:12:14.142Z",
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
                  "link": "/api/v1/people/671221",
                  "fullName": "Drew Waters",
                  "id": 671221
                },
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "batterHotColdZones": [],
                "pitcher": {
                  "link": "/api/v1/people/622766",
                  "fullName": "Miguel Diaz",
                  "id": 622766
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
                "homeScore": 4,
                "awayScore": 0,
                "rbi": 0,
                "description": "Nick Loftin pops out to first baseman Spencer Torkelson in foul territory.",
                "isOut": true,
                "eventType": "field_out",
                "type": "atBat",
                "event": "Pop Out"
              },
              "actionIndex": [
                0,
                1,
                2,
                3,
                4,
                5
              ],
              "runnerIndex": [
                0
              ],
              "pitchIndex": [
                6,
                7,
                8,
                9,
                10
              ],
              "playEndTime": "2023-09-28T17:11:30.797Z",
              "about": {
                "hasOut": true,
                "captivatingIndex": 0,
                "inning": 5,
                "isScoringPlay": false,
                "atBatIndex": 32,
                "startTime": "2023-09-28T17:10:12.259Z",
                "isTopInning": true,
                "endTime": "2023-09-28T17:11:30.797Z",
                "hasReview": false,
                "halfInning": "top",
                "isComplete": true
              },
              "count": {
                "outs": 1,
                "balls": 2,
                "strikes": 2
              },
              "atBatIndex": 32,
              "runners": [
                {
                  "credits": [
                    {
                      "position": {
                        "code": "3",
                        "name": "First Base",
                        "type": "Infielder",
                        "abbreviation": "1B"
                      },
                      "credit": "f_putout",
                      "player": {
                        "link": "/api/v1/people/679529",
                        "id": 679529
                      }
                    }
                  ],
                  "details": {
                    "playIndex": 10,
                    "responsiblePitcher": null,
                    "earned": false,
                    "rbi": false,
                    "teamUnearned": false,
                    "eventType": "field_out",
                    "isScoringEvent": false,
                    "event": "Pop Out",
                    "runner": {
                      "link": "/api/v1/people/679845",
                      "fullName": "Nick Loftin",
                      "id": 679845
                    },
                    "movementReason": null
                  },
                  "movement": {
                    "outNumber": 1,
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
                  "battingOrder": "200",
                  "count": {
                    "outs": 0,
                    "balls": 0,
                    "strikes": 0
                  },
                  "index": 0,
                  "details": {
                    "homeScore": 4,
                    "awayScore": 0,
                    "isScoringPlay": false,
                    "description": "Defensive switch from third base to left field for Matt Vierling.",
                    "isOut": false,
                    "eventType": "defensive_switch",
                    "event": "Defensive Switch",
                    "hasReview": false
                  },
                  "startTime": "2023-09-27T23:42:30.497Z",
                  "endTime": "2023-09-27T23:42:30.529Z",
                  "isSubstitution": true,
                  "position": {
                    "code": "7",
                    "name": "Outfielder",
                    "type": "Outfielder",
                    "abbreviation": "LF"
                  },
                  "type": "action",
                  "player": {
                    "link": "/api/v1/people/663837",
                    "id": 663837
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
                  "index": 1,
                  "details": {
                    "homeScore": 4,
                    "awayScore": 0,
                    "isScoringPlay": false,
                    "description": "Tyler Nevin remains in the game as the third baseman.",
                    "isOut": false,
                    "eventType": "defensive_switch",
                    "event": "Defensive Switch",
                    "hasReview": false
                  },
                  "startTime": "2023-09-27T23:42:30.529Z",
                  "endTime": "2023-09-27T23:45:01.462Z",
                  "isSubstitution": true,
                  "position": {
                    "code": "5",
                    "name": "Third Base",
                    "type": "Infielder",
                    "abbreviation": "3B"
                  },
                  "type": "action",
                  "replacedPlayer": {
                    "link": "/api/v1/people/668731",
                    "id": 668731
                  },
                  "player": {
                    "link": "/api/v1/people/663527",
                    "id": 663527
                  }
                },
                {
                  "isPitch": false,
                  "count": {
                    "outs": 0,
                    "balls": 0,
                    "strikes": 0
                  },
                  "index": 2,
                  "details": {
                    "homeScore": 4,
                    "awayScore": 0,
                    "isScoringPlay": false,
                    "description": "On-field Delay.",
                    "isOut": false,
                    "eventType": "game_advisory",
                    "event": "Game Advisory",
                    "hasReview": false
                  },
                  "startTime": "2023-09-27T23:45:01.462Z",
                  "endTime": "2023-09-27T23:45:33.851Z",
                  "type": "action",
                  "player": {
                    "link": "/api/v1/people/679845",
                    "id": 679845
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
                    "homeScore": 4,
                    "awayScore": 0,
                    "isScoringPlay": false,
                    "description": "Status Change - Delayed: Rain",
                    "isOut": false,
                    "eventType": "game_advisory",
                    "event": "Game Advisory",
                    "hasReview": false
                  },
                  "startTime": "2023-09-27T23:45:33.851Z",
                  "endTime": "2023-09-28T16:35:53.024Z",
                  "type": "action",
                  "player": {
                    "link": "/api/v1/people/679845",
                    "id": 679845
                  }
                },
                {
                  "isPitch": false,
                  "count": {
                    "outs": 0,
                    "balls": 0,
                    "strikes": 0
                  },
                  "index": 4,
                  "details": {
                    "homeScore": 4,
                    "awayScore": 0,
                    "isScoringPlay": false,
                    "description": "Umpire change:  John Bacon replaces  umpire Brock Ballou.",
                    "isOut": false,
                    "eventType": "umpire_substitution",
                    "event": "Umpire Substitution",
                    "hasReview": false
                  },
                  "startTime": "2023-09-28T16:35:53.024Z",
                  "endTime": "2023-09-28T17:03:38.605Z",
                  "type": "action",
                  "player": {
                    "link": "/api/v1/people/545402",
                    "id": 545402
                  },
                  "umpire": {
                    "link": "/api/v1/people/545402",
                    "id": 545402
                  }
                },
                {
                  "isPitch": false,
                  "count": {
                    "outs": 0,
                    "balls": 0,
                    "strikes": 0
                  },
                  "index": 5,
                  "details": {
                    "homeScore": 4,
                    "awayScore": 0,
                    "isScoringPlay": false,
                    "description": "Pitching Change: Miguel Diaz replaces Tarik Skubal.",
                    "isOut": false,
                    "eventType": "pitching_substitution",
                    "event": "Pitching Substitution",
                    "hasReview": false
                  },
                  "startTime": "2023-09-28T17:03:38.605Z",
                  "endTime": "2023-09-28T17:10:15.259Z",
                  "isSubstitution": true,
                  "position": {
                    "code": "1",
                    "name": "Pitcher",
                    "type": "Pitcher",
                    "abbreviation": "P"
                  },
                  "type": "action",
                  "player": {
                    "link": "/api/v1/people/622766",
                    "id": 622766
                  }
                },
                {
                  "playId": "40ddc1e2-6a05-4006-8efe-e65059d18506",
                  "pitchData": {
                    "endSpeed": 84.7,
                    "extension": 5.491311069367334,
                    "breaks": {
                      "spinRate": 2237,
                      "breakHorizontal": 17.5,
                      "breakAngle": 30,
                      "breakVertical": -23.2,
                      "breakVerticalInduced": 8.6,
                      "spinDirection": 214
                    },
                    "startSpeed": 93,
                    "zone": 11,
                    "plateTime": 0.40583751316583383,
                    "coordinates": {
                      "pfxX": -9.861783530300464,
                      "pX": -1.8710097305241622,
                      "pZ": 2.774218127119386,
                      "pfxZ": 5.150947352015944,
                      "vY0": -135.39525700631165,
                      "vZ0": -3.770198515023196,
                      "vX0": 1.3422585198286554,
                      "z0": 5.788630626753109,
                      "y0": 50.00245722856874,
                      "aX": -18.155269407667717,
                      "aY": 31.87030796940696,
                      "x": 188.32,
                      "x0": -1.0955448282363356,
                      "aZ": -22.68968297927744,
                      "y": 163.88
                    },
                    "strikeZoneTop": 3.43,
                    "strikeZoneBottom": 1.59
                  },
                  "isPitch": true,
                  "pitchNumber": 1,
                  "count": {
                    "outs": 0,
                    "balls": 1,
                    "strikes": 0
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
                      "code": "SI",
                      "description": "Sinker"
                    },
                    "trailColor": "rgba(50, 0, 221, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": false
                  },
                  "startTime": "2023-09-28T17:10:15.259Z",
                  "endTime": "2023-09-28T17:10:27.027Z",
                  "type": "pitch"
                },
                {
                  "playId": "35f301af-22a7-43af-8761-9ea8d79b4bc5",
                  "pitchData": {
                    "endSpeed": 85.1,
                    "extension": 5.607931402893653,
                    "breaks": {
                      "spinRate": 2118,
                      "breakHorizontal": 16.3,
                      "breakAngle": 9.6,
                      "breakVertical": -22.2,
                      "breakVerticalInduced": 9.4,
                      "spinDirection": 220
                    },
                    "startSpeed": 93.1,
                    "zone": 8,
                    "plateTime": 0.40503172196807125,
                    "coordinates": {
                      "pfxX": -9.612098846784331,
                      "pX": -0.2180594851199074,
                      "pZ": 1.8367307175945917,
                      "pfxZ": 5.802479429013111,
                      "vY0": -135.34486436304138,
                      "vZ0": -5.887557816702697,
                      "vX0": 4.974885641031525,
                      "z0": 5.546342081053191,
                      "y0": 50.00532661600969,
                      "aX": -17.795970788007423,
                      "aY": 30.146415460932708,
                      "x": 125.31,
                      "x0": -0.8332491379110598,
                      "aZ": -21.43602408565676,
                      "y": 189.19
                    },
                    "strikeZoneTop": 3.43,
                    "strikeZoneBottom": 1.59
                  },
                  "isPitch": true,
                  "pitchNumber": 2,
                  "count": {
                    "outs": 0,
                    "balls": 1,
                    "strikes": 1
                  },
                  "index": 7,
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
                      "code": "SI",
                      "description": "Sinker"
                    },
                    "trailColor": "rgba(50, 0, 221, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": true
                  },
                  "startTime": "2023-09-28T17:10:27.027Z",
                  "endTime": "2023-09-28T17:10:49.315Z",
                  "type": "pitch"
                },
                {
                  "playId": "60a4e5c2-76d1-4971-bfce-150c4ddbd993",
                  "pitchData": {
                    "endSpeed": 77,
                    "extension": 5.676517199818804,
                    "breaks": {
                      "spinRate": 2375,
                      "breakHorizontal": -7.6,
                      "breakAngle": 37.2,
                      "breakVertical": -38,
                      "breakVerticalInduced": 0.8,
                      "spinDirection": 107
                    },
                    "startSpeed": 84.3,
                    "zone": 14,
                    "plateTime": 0.4491191050816137,
                    "coordinates": {
                      "pfxX": 3.6312751734373108,
                      "pX": 1.1298637198538126,
                      "pZ": 0.5329352645902344,
                      "pfxZ": 1.1752842882094252,
                      "vY0": -122.58355898117587,
                      "vZ0": -5.7532553947881455,
                      "vX0": 3.832952692600668,
                      "z0": 5.549433075018608,
                      "y0": 50.00575741442638,
                      "aX": 5.4529801151270565,
                      "aY": 27.243634228433788,
                      "x": 73.93,
                      "x0": -0.933745079413447,
                      "aZ": -30.41403011702694,
                      "y": 224.39
                    },
                    "strikeZoneTop": 3.43,
                    "strikeZoneBottom": 1.59
                  },
                  "isPitch": true,
                  "pitchNumber": 3,
                  "count": {
                    "outs": 0,
                    "balls": 2,
                    "strikes": 1
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
                  "startTime": "2023-09-28T17:10:49.315Z",
                  "endTime": "2023-09-28T17:11:04.818Z",
                  "type": "pitch"
                },
                {
                  "playId": "16d67f68-9b07-46f6-a64a-0c733b1032b9",
                  "pitchData": {
                    "endSpeed": 86.1,
                    "extension": 5.6781441382523274,
                    "breaks": {
                      "spinRate": 2143,
                      "breakHorizontal": 16.2,
                      "breakAngle": 4.8,
                      "breakVertical": -21.8,
                      "breakVerticalInduced": 8.8,
                      "spinDirection": 216
                    },
                    "startSpeed": 95.1,
                    "zone": 9,
                    "plateTime": 0.39823551994687234,
                    "coordinates": {
                      "pfxX": -10.022115386376756,
                      "pX": 0.7701983656557537,
                      "pZ": 2.1060957578077026,
                      "pfxZ": 5.474260657917913,
                      "vY0": -138.16717005577206,
                      "vZ0": -5.411856301308634,
                      "vX0": 7.997903594368708,
                      "z0": 5.57383201883673,
                      "y0": 50.00246235244116,
                      "aX": -19.14714142769405,
                      "aY": 34.18706897140717,
                      "x": 87.64,
                      "x0": -0.8770773309344764,
                      "aZ": -21.716625583581642,
                      "y": 181.92
                    },
                    "strikeZoneTop": 3.43,
                    "strikeZoneBottom": 1.59
                  },
                  "isPitch": true,
                  "pitchNumber": 4,
                  "count": {
                    "outs": 0,
                    "balls": 2,
                    "strikes": 2
                  },
                  "index": 9,
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
                      "code": "SI",
                      "description": "Sinker"
                    },
                    "trailColor": "rgba(50, 0, 221, 1.0)",
                    "hasReview": false,
                    "isInPlay": false,
                    "isStrike": true
                  },
                  "startTime": "2023-09-28T17:11:04.818Z",
                  "endTime": "2023-09-28T17:11:19.373Z",
                  "type": "pitch"
                },
                {
                  "playId": "dfc2a0af-a7ab-4579-89e8-56114e121ed5",
                  "pitchData": {
                    "endSpeed": 78.1,
                    "extension": 5.4103075178922015,
                    "breaks": {
                      "spinRate": 2330,
                      "breakHorizontal": -8.5,
                      "breakAngle": 27.6,
                      "breakVertical": -35.8,
                      "breakVerticalInduced": 2.3,
                      "spinDirection": 97
                    },
                    "startSpeed": 84.8,
                    "zone": 14,
                    "plateTime": 0.4438826106096574,
                    "coordinates": {
                      "pfxX": 4.4521020666161615,
                      "pX": 0.21242111370517214,
                      "pZ": 1.2531835513825709,
                      "pfxZ": 1.7075733984913573,
                      "vY0": -123.50651546973556,
                      "vZ0": -4.513237673058201,
                      "vX0": 1.6927723489480755,
                      "z0": 5.5951557588264045,
                      "y0": 50.00105044244262,
                      "aX": 6.86060092587787,
                      "aY": 25.145409918133268,
                      "x": 108.9,
                      "x0": -1.060625815848165,
                      "aZ": -29.5394334103891,
                      "y": 204.94
                    },
                    "strikeZoneTop": 3.43,
                    "strikeZoneBottom": 1.59
                  },
                  "isPitch": true,
                  "pitchNumber": 5,
                  "count": {
                    "outs": 0,
                    "balls": 2,
                    "strikes": 2
                  },
                  "index": 10,
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
                      "code": "SL",
                      "description": "Slider"
                    },
                    "trailColor": "rgba(0, 0, 254, 1.0)",
                    "hasReview": false,
                    "isInPlay": true,
                    "isStrike": false
                  },
                  "hitData": {
                    "hardness": "medium",
                    "coordinates": {
                      "coordX": 169.47,
                      "coordY": 172.05
                    },
                    "launchSpeed": 55.5,
                    "location": "3",
                    "totalDistance": 130,
                    "trajectory": "popup",
                    "launchAngle": 56
                  },
                  "startTime": "2023-09-28T17:11:19.373Z",
                  "endTime": "2023-09-28T17:11:30.797Z",
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
                  "link": "/api/v1/people/679845",
                  "fullName": "Nick Loftin",
                  "id": 679845
                },
                "pitchHand": {
                  "code": "R",
                  "description": "Right"
                },
                "batterHotColdZones": [],
                "pitcher": {
                  "link": "/api/v1/people/622766",
                  "fullName": "Miguel Diaz",
                  "id": 622766
                },
                "pitcherHotColdZones": [],
                "batSide": {
                  "code": "R",
                  "description": "Right"
                }
              }
            }
          ],
          "currentPlay": {
            "result": {
              "homeScore": 4,
              "awayScore": 0,
              "rbi": 0,
              "description": "Mound Visit.",
              "isOut": false,
              "eventType": "mound_visit",
              "type": "atBat",
              "event": "Mound Visit"
            },
            "actionIndex": [],
            "runnerIndex": [],
            "pitchIndex": [
              0,
              1
            ],
            "playEndTime": "2023-09-28T17:19:28.376Z",
            "about": {
              "hasOut": false,
              "captivatingIndex": 0,
              "inning": 5,
              "isScoringPlay": false,
              "atBatIndex": 37,
              "startTime": "2023-09-28T17:18:37.014Z",
              "isTopInning": false,
              "endTime": "2023-09-28T17:19:28.376Z",
              "halfInning": "bottom",
              "isComplete": false
            },
            "count": {
              "outs": 1,
              "balls": 2,
              "strikes": 0
            },
            "atBatIndex": 37,
            "runners": [],
            "playEvents": [
              {
                "playId": "9079e7ba-327d-4465-9f4e-cc4746176041",
                "pitchData": {
                  "endSpeed": 82.2,
                  "extension": 6.9366466312973465,
                  "breaks": {
                    "spinRate": 2158,
                    "breakHorizontal": -7.6,
                    "breakAngle": 70.8,
                    "breakVertical": -30.1,
                    "breakVerticalInduced": 4.3,
                    "spinDirection": 155
                  },
                  "startSpeed": 89.1,
                  "zone": 14,
                  "plateTime": 0.4227261291558797,
                  "coordinates": {
                    "pfxX": 2.947577523771618,
                    "pX": 1.5275891022437904,
                    "pZ": 2.402090010144677,
                    "pfxZ": 2.488943399219904,
                    "vY0": -129.3952800551744,
                    "vZ0": -1.8975897993363553,
                    "vX0": 10.306161356647307,
                    "z0": 5.27758882735852,
                    "y0": 50.00037610915947,
                    "aX": 5.01259745144724,
                    "aY": 26.08511456413439,
                    "x": 58.77,
                    "x0": -2.883760376556283,
                    "aZ": -27.932321776501134,
                    "y": 173.92
                  },
                  "strikeZoneTop": 3.46,
                  "strikeZoneBottom": 1.61
                },
                "isPitch": true,
                "pitchNumber": 1,
                "count": {
                  "outs": 1,
                  "balls": 1,
                  "strikes": 0
                },
                "index": 0,
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
                "startTime": "2023-09-28T17:19:01.685Z",
                "endTime": "2023-09-28T17:19:20.674Z",
                "type": "pitch"
              },
              {
                "playId": "c7453757-5b50-435b-9637-37eff181b5c4",
                "pitchData": {
                  "endSpeed": 86.6,
                  "breaks": {
                    "spinRate": 2258,
                    "breakHorizontal": 8.9,
                    "breakAngle": 56.4,
                    "breakVertical": -14,
                    "breakVerticalInduced": 16.2,
                    "spinDirection": 224
                  },
                  "startSpeed": 96,
                  "zone": 14,
                  "plateTime": 0.3963620551624989,
                  "coordinates": {
                    "pfxX": -6.89965109487358,
                    "pX": 2.0410202044688535,
                    "pZ": 2.4015936230999304,
                    "pfxZ": 9.58324776334951,
                    "vY0": -138.81987947924054,
                    "vZ0": -4.903850759767577,
                    "vX0": 15.280698818437926,
                    "z0": 5.120435095333745,
                    "y0": 50.001787093095906,
                    "aX": -13.306918898734635,
                    "aY": 34.52403600624424,
                    "x": 39.2,
                    "x0": -2.667916950776673,
                    "aZ": -13.691559309984642,
                    "y": 173.94
                  },
                  "strikeZoneTop": 3.46,
                  "strikeZoneBottom": 1.61
                },
                "isPitch": true,
                "pitchNumber": 2,
                "count": {
                  "outs": 1,
                  "balls": 2,
                  "strikes": 0
                },
                "index": 1,
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
                "startTime": "2023-09-28T17:19:20.674Z",
                "endTime": "2023-09-28T17:19:28.376Z",
                "type": "pitch"
              },
              {
                "isPitch": false,
                "count": {
                  "outs": 1,
                  "balls": 2,
                  "strikes": 0
                },
                "index": 2,
                "details": {
                  "homeScore": 4,
                  "awayScore": 0,
                  "isScoringPlay": false,
                  "description": "Mound Visit.",
                  "isOut": false,
                  "eventType": "mound_visit",
                  "event": "Mound Visit",
                  "hasReview": false
                },
                "startTime": "2023-09-28T17:19:28.376Z",
                "endTime": "2023-09-28T17:19:28.376Z",
                "type": "action"
              }
            ],
            "matchup": {
              "splits": {
                "batter": "vs_RHP",
                "menOnBase": "Men_On",
                "pitcher": "vs_RHB"
              },
              "batter": {
                "link": "/api/v1/people/679529",
                "fullName": "Spencer Torkelson",
                "id": 679529
              },
              "pitchHand": {
                "code": "R",
                "description": "Right"
              },
              "batterHotColdZones": [
                {
                  "temp": "hot",
                  "color": "rgba(214, 41, 52, .55)",
                  "zone": "01",
                  "value": "1.200"
                },
                {
                  "temp": "lukewarm",
                  "color": "rgba(255, 255, 255, 0.55)",
                  "zone": "02",
                  "value": ".864"
                },
                {
                  "temp": "lukewarm",
                  "color": "rgba(255, 255, 255, 0.55)",
                  "zone": "03",
                  "value": ".933"
                },
                {
                  "temp": "cool",
                  "color": "rgba(150, 188, 255, .55)",
                  "zone": "04",
                  "value": ".629"
                },
                {
                  "temp": "warm",
                  "color": "rgba(234, 147, 153, .55)",
                  "zone": "05",
                  "value": ".976"
                },
                {
                  "temp": "lukewarm",
                  "color": "rgba(255, 255, 255, 0.55)",
                  "zone": "06",
                  "value": ".827"
                },
                {
                  "temp": "lukewarm",
                  "color": "rgba(255, 255, 255, 0.55)",
                  "zone": "07",
                  "value": ".719"
                },
                {
                  "temp": "lukewarm",
                  "color": "rgba(255, 255, 255, 0.55)",
                  "zone": "08",
                  "value": ".857"
                },
                {
                  "temp": "cold",
                  "color": "rgba(6, 90, 238, .55)",
                  "zone": "09",
                  "value": ".345"
                },
                {
                  "temp": "lukewarm",
                  "color": "rgba(255, 255, 255, 0.55)",
                  "zone": "11",
                  "value": ".762"
                },
                {
                  "temp": "cold",
                  "color": "rgba(6, 90, 238, .55)",
                  "zone": "12",
                  "value": ".348"
                },
                {
                  "temp": "lukewarm",
                  "color": "rgba(255, 255, 255, 0.55)",
                  "zone": "13",
                  "value": ".708"
                },
                {
                  "temp": "cold",
                  "color": "rgba(6, 90, 238, .55)",
                  "zone": "14",
                  "value": ".410"
                }
              ],
              "batterHotColdZoneStats": {
                "stats": [
                  {
                    "splits": [
                      {
                        "stat": {
                          "name": "battingAverage",
                          "zones": [
                            {
                              "temp": "hot",
                              "color": "rgba(214, 41, 52, .55)",
                              "zone": "01",
                              "value": ".393"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "02",
                              "value": ".286"
                            },
                            {
                              "temp": "warm",
                              "color": "rgba(234, 147, 153, .55)",
                              "zone": "03",
                              "value": ".333"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "04",
                              "value": ".286"
                            },
                            {
                              "temp": "warm",
                              "color": "rgba(234, 147, 153, .55)",
                              "zone": "05",
                              "value": ".346"
                            },
                            {
                              "temp": "cool",
                              "color": "rgba(150, 188, 255, .55)",
                              "zone": "06",
                              "value": ".240"
                            },
                            {
                              "temp": "cool",
                              "color": "rgba(150, 188, 255, .55)",
                              "zone": "07",
                              "value": ".226"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "08",
                              "value": ".291"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "09",
                              "value": ".130"
                            },
                            {
                              "temp": "cool",
                              "color": "rgba(150, 188, 255, .55)",
                              "zone": "11",
                              "value": ".238"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "12",
                              "value": ".105"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "13",
                              "value": ".133"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "14",
                              "value": ".078"
                            }
                          ]
                        }
                      },
                      {
                        "stat": {
                          "name": "onBasePlusSlugging",
                          "zones": [
                            {
                              "temp": "hot",
                              "color": "rgba(214, 41, 52, .55)",
                              "zone": "01",
                              "value": "1.200"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "02",
                              "value": ".864"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "03",
                              "value": ".933"
                            },
                            {
                              "temp": "cool",
                              "color": "rgba(150, 188, 255, .55)",
                              "zone": "04",
                              "value": ".629"
                            },
                            {
                              "temp": "warm",
                              "color": "rgba(234, 147, 153, .55)",
                              "zone": "05",
                              "value": ".976"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "06",
                              "value": ".827"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "07",
                              "value": ".719"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "08",
                              "value": ".857"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "09",
                              "value": ".345"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "11",
                              "value": ".762"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "12",
                              "value": ".348"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "13",
                              "value": ".708"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "14",
                              "value": ".410"
                            }
                          ]
                        }
                      },
                      {
                        "stat": {
                          "name": "exitVelocity",
                          "zones": [
                            {
                              "temp": "cool",
                              "color": "rgba(150, 188, 255, .55)",
                              "zone": "01",
                              "value": "87.85"
                            },
                            {
                              "temp": "hot",
                              "color": "rgba(214, 41, 52, .55)",
                              "zone": "02",
                              "value": "96.86"
                            },
                            {
                              "temp": "hot",
                              "color": "rgba(214, 41, 52, .55)",
                              "zone": "03",
                              "value": "98.19"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "04",
                              "value": "86.34"
                            },
                            {
                              "temp": "hot",
                              "color": "rgba(214, 41, 52, .55)",
                              "zone": "05",
                              "value": "97.65"
                            },
                            {
                              "temp": "warm",
                              "color": "rgba(234, 147, 153, .55)",
                              "zone": "06",
                              "value": "92.94"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "07",
                              "value": "90.87"
                            },
                            {
                              "temp": "hot",
                              "color": "rgba(214, 41, 52, .55)",
                              "zone": "08",
                              "value": "96.36"
                            },
                            {
                              "temp": "lukewarm",
                              "color": "rgba(255, 255, 255, 0.55)",
                              "zone": "09",
                              "value": "90.48"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "11",
                              "value": "80.89"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "12",
                              "value": "86.31"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "13",
                              "value": "78.33"
                            },
                            {
                              "temp": "cold",
                              "color": "rgba(6, 90, 238, .55)",
                              "zone": "14",
                              "value": "80.95"
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
                "link": "/api/v1/people/663837",
                "fullName": "Matt Vierling",
                "id": 663837
              },
              "pitcher": {
                "link": "/api/v1/people/674444",
                "fullName": "Steven Cruz",
                "id": 674444
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
      "startTime": "2023-09-28T17:10:00Z",
      "lastUpdate": "2023-09-28T17:20:12.618Z",
      "gameStarted": "true",
      "gameEnded": "false",
      "liveGameChatRoomID": null,
      "createdAt": "2023-09-28T17:19:59.243Z",
      "updatedAt": "2023-09-28T17:20:12.859Z",
      "losingPitcherStats": [],
      "winningPitcherStats": [],
      "oriolesOutcome": [],
      "currentHalfInning": "Bot 5",
      "currentBatterStats": "1-2 | K",
      "currentPitcherStats": "0.1 IP, 0 ER, 0 K, BB"
    }

    await this.openBaseballChatroom(this.testData, '716416')

    Hub.listen('api', (data: any) => {
      const { payload } = data;
      if (payload.event === CONNECTION_STATE_CHANGE) {
        const connectionState = payload.data.connectionState as ConnectionState;
        console.log(connectionState)
      }
    })
  }

  async openBaseballChatroom(gameData, gameID){
    const modal = await this.modalController.create({
      component: BaseballChatroomPage,
      componentProps: {
        baseballData: gameData,
        sportsGameID: gameID
      }
    });

    // modal.onDidDismiss().then((dataReturned) => {
    //   if (dataReturned !== null) {
    //     this.dataReturned = dataReturned.data;
    //   }
    // });
    return await modal.present();
  }

  startSubscriptions() {
    this.onUpdateHubPost = <Subscription>(
      this.api.OnUpdateHubPostsListener().subscribe({
        next: async (event: any) => {
          const data = event;
          console.log(data)
        }
      })
    )
    this.onUpdateSportsGame = <Subscription>(
      this.api.OnUpdateSportsGameListener().subscribe({
        next: async (event: any) => {
          const data = event;
          this.hubData.map(async (game) => {
            if(data.value.data.onUpdateSportsGame.id === game.sportsgame.id){
              game.sportsgame.losingPitcherStats = [];
              game.sportsgame.winningPitcherStats = [];
              game.sportsgame.oriolesOutcome = [];
              game.sportsgame.currentHalfInning = null;
              game.sportsgame.currentBatterStats = [];
              game.sportsgame.currentPitcherStats = [];
              game.sportsgame = data.value.data.onUpdateSportsGame;
              game.sportsgame.basicGameInfo = JSON.parse(data.value.data.onUpdateSportsGame.basicGameInfo)
              game.sportsgame.currentHalfInning = game.sportsgame.gameStatus === 'In Progress' ? game.sportsgame.basicGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.sportsgame.basicGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.sportsgame.basicGameInfo[0].currentPlay.about.inning.toString()) : null;

              if (game.sportsgame.gameStatus === 'Final') {
                game.sportsgame.oriolesOutcome = (game.sportsgame.gameStatus === 'Final' && (game.sportsgame.awayTeam === 'Baltimore Orioles' && game.sportsgame.basicGameInfo[0].currentPlay.result.awayScore > game.basicGameInfo[0].currentPlay.result.homeScore) || (game.sportsgame.homeTeam === 'Baltimore Orioles' && game.sportsgame.basicGameInfo[0].currentPlay.result.homeScore > game.sportsgame.basicGameInfo[0].currentPlay.result.awayScore)) ? "O's WON" : (game.sportsgame.gameStatus === 'Final' && (game.sportsgame.awayTeam === 'Baltimore Orioles' && game.sportsgame.basicGameInfo[0].currentPlay.result.awayScore < game.sportsgame.basicGameInfo[0].currentPlay.result.homeScore) || (game.sportsgame.homeTeam === 'Baltimore Orioles' && game.sportsgame.basicGameInfo[0].currentPlay.result.homeScore < game.sportsgame.basicGameInfo[0].currentPlay.result.awayScore)) ? "O's LOST" : null;
                game.sportsgame.losingPitcherStats = (game.sportsgame.basicGameInfo[0].finalData && game.sportsgame.gameStatus === 'Final') ? await this.getFinalPitcherGameStats(game.sportsgame.basicGameInfo[0].finalData.loser.id, +game.sportsgame.id) as any : null;
                game.sportsgame.winningPitcherStats = (game.sportsgame.gameStatus === 'Final' && game.sportsgame.basicGameInfo[0].finalData) ? await this.getFinalPitcherGameStats(game.sportsgame.basicGameInfo[0].finalData.winner.id, +game.sportsgame.id) as any : null;
              }

              if (game.sportsgame.gameStatus === 'Scheduled' || game.sportsgame.gameStatus === 'Pre-Game' || game.sportsgame.gameStatus === 'Warmup') {
                game.sportsgame.startingAwayPitcherStats = ((game.sportsgame.gameStatus !== 'In Progress' && game.sportsgame.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(game.sportsgame.basicGameInfo[0].initialGameData.probablePitchers.away.id) as any : null;
                game.sportsgame.startingHomePitcherStats = ((game.sportsgame.gameStatus !== 'In Progress' && game.sportsgame.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(game.sportsgame.basicGameInfo[0].initialGameData.probablePitchers.home.id) as any : null;
              }

              if (game.gameStatus === 'In Progress') {
                game.sportsgame.currentHalfInning = game.gameStatus === 'In Progress' ? game.basicGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(game.basicGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", game.basicGameInfo[0].currentPlay.about.inning.toString()) : null;
                game.sportsgame.currentBatterStats = (game.gameStatus !== 'Final' && game.basicGameInfo[0].currentPlay) ? await this.getCurrentBatterGameStats(game.basicGameInfo[0].currentPlay.matchup.batter.id, +game.id) as any : null;
                game.sportsgame.currentPitcherStats = (game.gameStatus !== 'Final' && game.basicGameInfo[0].currentPlay) ? await this.getCurrentPitcherGameStats(game.basicGameInfo[0].currentPlay.matchup.pitcher.id, +game.id) as any : null;
              }
            }
          })
        }
      })
    )
  }

  async ngOnDestroy() {
    if (this.onUpdateSportsGame) {
      await this.onUpdateSportsGame.unsubscribe();
    }
    if (this.onUpdateHubPost) {
      await this.onUpdateHubPost.unsubscribe();
    }
  }


  async getHubData(){
    await this.api.HubPostsBySortKeyAndTimePosted("hubpost", null, ModelSortDirection.DESC).then(data => {
      this.hubData = data.items;
      this.hubData.map(async hubs => {
        if(hubs.postType === 'sport' && hubs.sportsgame.sport === 'baseball'){
          hubs.sportsgame.basicGameInfo = await JSON.parse(hubs.sportsgame.basicGameInfo)
          hubs.sportsgame.losingPitcherStats = [];
          hubs.sportsgame.winningPitcherStats = [];
          hubs.sportsgame.oriolesOutcome = [];
          hubs.sportsgame.currentHalfInning = null;
          hubs.sportsgame.currentBatterStats = [];
          hubs.sportsgame.currentPitcherStats = [];

          if (hubs.sportsgame.gameStatus === 'Final') {
            hubs.sportsgame.oriolesOutcome = (hubs.sportsgame.gameStatus === 'Final' && (hubs.sportsgame.awayTeam === 'Baltimore Orioles' && hubs.sportsgame.basicGameInfo[0].currentPlay.result.awayScore > hubs.sportsgame.basicGameInfo[0].currentPlay.result.homeScore) || (hubs.sportsgame.homeTeam === 'Baltimore Orioles' && hubs.sportsgame.basicGameInfo[0].currentPlay.result.homeScore > hubs.sportsgame.basicGameInfo[0].currentPlay.result.awayScore)) ? "O's WON" : (hubs.sportsgame.gameStatus === 'Final' && (hubs.sportsgame.awayTeam === 'Baltimore Orioles' && hubs.sportsgame.basicGameInfo[0].currentPlay.result.awayScore < hubs.sportsgame.basicGameInfo[0].currentPlay.result.homeScore) || (hubs.sportsgame.homeTeam === 'Baltimore Orioles' && hubs.sportsgame.basicGameInfo[0].currentPlay.result.homeScore < hubs.sportsgame.basicGameInfo[0].currentPlay.result.awayScore)) ? "O's LOST" : null;
            hubs.sportsgame.losingPitcherStats = (hubs.sportsgame.basicGameInfo[0].finalData && hubs.sportsgame.gameStatus === 'Final') ? await this.getFinalPitcherGameStats(hubs.sportsgame.basicGameInfo[0].finalData.loser.id, +hubs.sportsgame.id) : [];
            hubs.sportsgame.winningPitcherStats = (hubs.sportsgame.gameStatus === 'Final' && hubs.sportsgame.basicGameInfo[0].finalData) ? await this.getFinalPitcherGameStats(hubs.sportsgame.basicGameInfo[0].finalData.winner.id, +hubs.sportsgame.id) : [];
          }

          if (hubs.sportsgame.gameStatus === 'Scheduled' || hubs.sportsgame.gameStatus === 'Pre-Game' || hubs.sportsgame.gameStatus === 'Warmup') {
            hubs.sportsgame.startingAwayPitcherStats = ((hubs.sportsgame.gameStatus !== 'In Progress' && hubs.sportsgame.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(hubs.sportsgame.basicGameInfo[0].initialGameData.probablePitchers.away.id) as any : [];
            hubs.sportsgame.startingHomePitcherStats = ((hubs.sportsgame.gameStatus !== 'In Progress' && hubs.sportsgame.gameStatus !== 'Final')) ? await this.getStartingPitcherStats(hubs.sportsgame.basicGameInfo[0].initialGameData.probablePitchers.home.id) as any : [];
          }

          if (hubs.sportsgame.gameStatus === 'In Progress') {
            hubs.sportsgame.currentHalfInning = hubs.sportsgame.gameStatus === 'In Progress' ? hubs.sportsgame.basicGameInfo[0].currentPlay.about.halfInning.charAt(0).toUpperCase().concat(hubs.sportsgame.basicGameInfo[0].currentPlay.about.halfInning.slice(1, 3), " ", hubs.sportsgame.basicGameInfo[0].currentPlay.about.inning.toString()) : null;
            hubs.sportsgame.currentBatterStats = (hubs.sportsgame.gameStatus !== 'Final' && hubs.sportsgame.basicGameInfo[0].currentPlay) ? await this.getCurrentBatterGameStats(hubs.sportsgame.basicGameInfo[0].currentPlay.matchup.batter.id, +hubs.sportsgame.id) as any : [];
            hubs.sportsgame.currentPitcherStats = (hubs.sportsgame.gameStatus !== 'Final' && hubs.sportsgame.basicGameInfo[0].currentPlay) ? await this.getCurrentPitcherGameStats(hubs.sportsgame.basicGameInfo[0].currentPlay.matchup.pitcher.id, +hubs.sportsgame.id) as any : [];
          }
        }
      })
    })
  }

  async getFinalPitcherGameStats(playerId, gamePk) {
    return await this.sportsService.getPitcherFinalData(playerId, gamePk).then(data => data);
  }

  async getStartingPitcherStats(playerId) {
    return await this.sportsService.getPitcherSeasonData(playerId).then(data => data);
  }

  async getCurrentBatterGameStats(playerId, gamePk) {
    return await this.sportsService.getBatterData(playerId, gamePk).then(data => data);
  }
  
  async getCurrentPitcherGameStats(playerId, gamePk) {
    return await this.sportsService.getPitcherData(playerId, gamePk).then(data => data);
  }

  async refreshEvent(event){

      if(this.mobilePlatform){
        await Haptics.impact({style: ImpactStyle.Heavy})
      }

      const alert = await this.alertController.create({
        header: 'Game Update Failed',
        message: 'Please try again in a moment.',
        buttons: ['OK']
      })

      await this.sportsService.updateOriolesData().then(async (data) => data).catch(async error => {
        await alert.present();
      }).finally(() => {
        event.target.complete();
      });


  }

}
