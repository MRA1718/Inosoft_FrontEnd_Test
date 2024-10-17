import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: [],
        filteredData: [],
        uniqueValues: {
            productType: [],
            grade: [],
            size: [],
            connection: [],
        },
    },
    mutations: {
        setData(state, data){
            state.data = data;
            
        },
        setFilteredData(state, filteredData) {
            state.filteredData = filteredData;
        },
        setUniqueValues(state) {
            const { inventory } = state;
            
            const uniqueProductTypes = [...new Set(data.map(item => item.productType))];
            const uniqueGrades = [...new Set(data.map(item => item.grade))];
            const uniqueSizes = [...new Set(data.map(item => item.size))];
            const uniqueConnections = [...new Set(data.map(item => item.connection))];

            state.uniqueValues.productType = uniqueProductTypes;
            state.uniqueValues.grade = uniqueGrades;
            state.uniqueValues.size = uniqueSizes;
            state.uniqueValues.connection = uniqueConnections;
        },
    },
    actions: {
        async fetchData({ commit }) {
            try{
                const response = await axios.get('/data.json');
                commit('setData', response.data);
                commit('setFilteredData', response.data);
                commit('setUniqueValues');
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        },
        filteredData({ state, commit}, filters) {
            const { productType, grade, size, connection } = filters;
            const filtered = state.data.filter(item => {
                return (
                    (!productType || item.productType === productType) &&
                    (!grade || item.grade === grade) &&
                    (!size || item.size === size) &&
                    (!connection || item.connection === connection)
                );
            });
            commit('setFilteredData', filtered);
            commit('setUniqueValues');
        },
    },
    getters: {
        allFilteredData: (state) => state.filteredData,
        uniqueValues: (state) => state.uniqueValues,
    }
});