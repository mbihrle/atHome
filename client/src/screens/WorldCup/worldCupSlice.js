import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allCountries: [],
    countriesGroupA: [],
    countriesGroupB: [],
    countriesGroupC: [],
    countriesGroupD: [],
    countriesGroupE: [],
    countriesGroupF: [],
    countriesGroupG: [],
    countriesGroupH: [],
};


export const worldCupSlice = createSlice({
    name: 'worlCupSliceName',
    initialState,
    reducers: {
        addMatchInfos: (state, action) => {
            const teamInfosOfMatch = action.payload.matchInfos;
            console.log('teamInfosOfMatch: ', teamInfosOfMatch);
            teamInfosOfMatch.forEach((teamInfo) => {
                const {
                    id,
                    won,
                    lost,
                    drawn,
                    goals,
                    conceeded,
                    goalDiff,
                    points,
                } = teamInfo;
                state.allCountries.forEach((country) => {
                    if (country.id === id) {
                        country.gamesPlayed += 1;
                        country.won += won;
                        country.lost += lost;
                        country.drawn += drawn;
                        country.goals += goals;
                        country.conceeded += conceeded;
                        country.goalDiff += goalDiff;
                        country.points += points;
                    }
                });
            });

            const rankCountriesInGroup = (groupId) => {
                return state.allCountries
                    .filter((country) => {
                        return country.groupId === groupId;
                    })
                    .sort(
                        (a, b) =>
                            b.points - a.points ||
                            b.goalDiff - a.goalDiff ||
                            b.goals - a.goals ||
                            b.id - b.id
                        // || Math.random() - 0.5
                    )
                    .map((e, i) => {
                        e.rank = i + 1;
                        return e;
                    });
            };

            state.countriesGroupA = rankCountriesInGroup(1);
            state.countriesGroupB = rankCountriesInGroup(2);
            state.countriesGroupC = rankCountriesInGroup(3);
            state.countriesGroupD = rankCountriesInGroup(4);
            state.countriesGroupE = rankCountriesInGroup(5);
            state.countriesGroupF = rankCountriesInGroup(6);
            state.countriesGroupG = rankCountriesInGroup(7);
            state.countriesGroupH = rankCountriesInGroup(8);

            state.allCountries = state.countriesGroupA.concat(
                state.countriesGroupB,
                state.countriesGroupC,
                state.countriesGroupD,
                state.countriesGroupE,
                state.countriesGroupF,
                state.countriesGroupG,
                state.countriesGroupH
            );
        },
        addNewCountries: (state, action) => {
            console.log('action.payload addNewCountries: ', action.payload);
            state.allCountries = action.payload;
            state.countriesGroupA = state.allCountries.filter((country) => {
                return country.groupId === 1;
            });
            state.countriesGroupB = state.allCountries.filter((country) => {
                return country.groupId === 2;
            });
            state.countriesGroupC = state.allCountries.filter((country) => {
                return country.groupId === 3;
            });
            state.countriesGroupD = state.allCountries.filter((country) => {
                return country.groupId === 4;
            });
            state.countriesGroupE = state.allCountries.filter((country) => {
                return country.groupId === 5;
            });
            state.countriesGroupF = state.allCountries.filter((country) => {
                return country.groupId === 6;
            });
            state.countriesGroupG = state.allCountries.filter((country) => {
                return country.groupId === 7;
            });
            state.countriesGroupH = state.allCountries.filter((country) => {
                return country.groupId === 8;
            });
        },
    },
});

export const { addMatchInfos, addNewCountries } = worldCupSlice.actions;
export default worldCupSlice.reducer;
