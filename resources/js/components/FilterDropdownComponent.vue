<template>
    <div class="filter-dropdown">
        <div class="dropdown-wrapper">
            <div class="dropdown">
                <input
                    type="text"
                    placeholder="Search..."
                    v-model="searchQuery"
                    class="search-input"
                    @focus="showOptions = true"
                    @blur="hideOptions"
                />
                <div class="dropdown-options" v-if="showOptions">
                    <ul>
                        <li
                            v-for="option in filteredOptions"
                            :key="option"
                            @click="selectOption(option)"
                        >
                            {{ option }} ({{ count[option] || 0 }})
                        </li>
                    </ul>
                </div>
            </div>
            <i
                class="reset-icon fas fa-times"
                v-if="selectedValue !== ''"
                @click="resetSelection"
                title="Reset"
            ></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        options: Array,
        selected: String,
        onSelect: Function,
        resetFilter: Function,
        count: Object,
    },
    data() {
        return {
            selectedValue: this.selected || '',
            searchQuery: this.selected ? this.formatOptionWithCount(this.selected) : '', // Show selected value and count
            showOptions: false,
        };
    },
    computed: {
        filteredOptions() {
            return this.options.filter(option =>
            option.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
    methods: {
        selectOption(option) {
            this.selectedValue = option;
            this.searchQuery = this.formatOptionWithCount(option); // Set the selected option and its count in the search bar
            this.onSelect(option);
            this.showOptions = false;
        },
            resetSelection() {
            this.selectedValue = ''; 
            this.searchQuery = ''; 
            this.onSelect(''); 
            this.resetFilter(); 
        },
        hideOptions() {
            setTimeout(() => {
                this.showOptions = false;
            }, 200);
        },
        formatOptionWithCount(option) {
        return `${option} (${this.count[option] || 0})`;
        },
    },
    watch: {
        selcted(newVal) {
            this.selectedValue = newVal;
            this.searchQuery = newVal ? this.formatOptionWithCount(newVal) : '';
        },
    },
};
</script>

<style scoped>
    
    .dropdown-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }
    
    .search-input {
        padding: 5px;
        width: 100%;
        box-sizing: border-box;
    }
    
    .dropdown-options {
        position: absolute;
        top: 100%; 
        left: 0;
        right: 0;
        border: 1px solid #ccc;
        background-color: #fff;
        z-index: 1000; 
        max-height: 200px; 
        overflow-y: auto; 
    }
    
    .dropdown-options ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    
    .dropdown-options li {
        padding: 8px;
        cursor: pointer;
    }
    
    .dropdown-options li:hover {
        background-color: #f0f0f0; 
    }
    
    .reset-icon {
        cursor: pointer;
        margin-left: 8px;
        color: #333;
    }
    
    .reset-icon:hover {
        color: #ff4d4d;
    }
</style>