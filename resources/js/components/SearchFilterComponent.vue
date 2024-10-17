<template>
    <div class="search-container">
        <div class="filter-container">
      
        <FilterDropdown
            label="Product Type"
            :options="uniqueValues.productType"
            :selected="filters.productType"
            :onSelect="(value) => updateFilters('productType', value)"
            :resetFilter="() => resetFilter('productType')"
            :count="countByType"
        />
        <FilterDropdown
            label="Grade"
            :options="filteredGrades"
            :selected="filters.grade"
            :onSelect="(value) => updateFilters('grade', value)"
            :resetFilter="() => resetFilter('grade')"
            :count="countByGrade"
        />
        <FilterDropdown
            label="Size (OD)"
            :options="filteredSizes"
            :selected="filters.size"
            :onSelect="(value) => updateFilters('size', value)"
            :resetFilter="() => resetFilter('size')"
            :count="countBySize"
        />
        <FilterDropdown
            label="Connection"
            :options="filteredConnections"
            :selected="filters.connection"
            :onSelect="(value) => updateFilters('connection', value)"
            :resetFilter="() => resetFilter('connection')"
            :count="countByConnection"
        />
        <FindButton @find="applyFilters" />
    </div>

    <div v-if="showTable" @scroll="handleScroll" class="table-container" ref="tableContainer">
      <FilteredInventoryTable :displayedInventory="displayedInventory" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ButtonComponent from './ButtonComponent.vue';
import FilterDropdownComponent from './FilterDropdownComponent.vue';
import FilteredTableComponent from './FilteredTableComponent.vue';
import { Button } from 'bootstrap';

export default {
    components: {
        FilterDropdownComponent,
        ButtonComponent,
        FilteredTableComponent,      
    },
    data() {
        return {
            filters: {
                productType: '',
                grade: '',
                size: '',
                connection: '',
            },
            showTable:false,
            displayedData: [],
            pageSize: 10,
        };
    },
    computed: {
        ...mapState(['data']),
        ...mapGetters(['uniqueValues']),
        
        filteredGrades() {
            return this.uniqueValues.grade.filter(grade =>
                !this.filters.productType || this.data.some(item => item.productType === this.filters.productType && item.grade === grade)
            );
        },
        filteredSizes() {
            return this.uniqueValues.size.filter(size =>
                !this.filters.grade || this.data.some(item => item.grade === this.filters.grade && item.size === size)
            );
        },
        filteredConnections() {
            return this.uniqueValues.connection.filter(connection =>
                !this.filters.size || this.data.some(item => item.size === this.filters.size && item.connection === connection)
            );
        },
        
        countByType() {
            const counts = {};
            this.data.forEach(item => {
                counts[item.productType] = (counts[item.productType] || 0) + 1;
            });
            return counts;
        },
        countByGrade() {
            const counts = {};
            this.data.forEach(item => {
                if (!this.filters.productType || item.productType === this.filters.productType) {
                    counts[item.grade] = (counts[item.grade] || 0) + 1;
                }
            });
            return counts;
        },
        countBySize() {
            const counts = {};
            this.data.forEach(item => {
                if (!this.filters.grade || item.grade === this.filters.grade) {
                counts[item.size] = (counts[item.size] || 0) + 1;
                }
            });
            return counts;
        },
        countByConnection() {
            const counts = {};
            this.data.forEach(item => {
                if (!this.filters.size || item.size === this.filters.size) {
                    counts[item.connection] = (counts[item.connection] || 0) + 1;
                }
            });
            return counts;
        },
    },
    methods: {
        ...mapActions(['fetchData']),
        
        updateFilters(filterName, value) {
            this.filters[filterName] = value;
        },
        resetFilter(filterName) {
            this.filters[filterName] = '';
        },
        applyFilters() {
            this.filterData();
            this.showTable = true;
        },
        filterData() {
            this.displayedData = this.data.filter(item => {
            return (
                (!this.filters.productType || item.productType === this.filters.productType) &&
                (!this.filters.grade || item.grade === this.filters.grade) &&
                (!this.filters.size || item.size === this.filters.size) &&
                (!this.filters.connection || item.connection === this.filters.connection)
            );
            });
        },
        handleScroll() {
            const container = this.$refs.tableContainer;
            if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
                this.loadMoreItems();
            }
        },
        loadMoreItems() {
            const currentCount = this.displayedInventory.length;
            const newItems = this.inventory.slice(currentCount, currentCount + this.pageSize);
    
            if (newItems.length) {
                this.displayedInventory.push(...newItems);
            }
        }
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style scoped>
    .search-container {
        position: relative;
    }

    .table-container {
        height: 50vh;
    }

    .filter-container {
        display: flex;
        justify-content: center;
        gap: 15px;
        flex-wrap: wrap;
        align-items: center;
    }
</style>