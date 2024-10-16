import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const Store = new Vuex.Store({
    state: {
        data: [],
        productTypes: [],
        grades: [],
        sizes: [],
        connections: [],
        loading: false,
    },
    mutations: {
        setData(state, data){
            state.data = data;
            
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
    },
    actions: {
        async fetchData({ commit }) {
            commit('setLoading', true);
            try{
                const response = await axios.get('/data.json');
                commit('setData', response.data);
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            } finally {
                commit('setLoading', false);
            }
        },
    },
    getters: {

    }
});