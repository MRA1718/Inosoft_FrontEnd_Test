<template>
    <div class="table-container">
        <table class="responsive-table">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Item ID</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Country</th>
                    <th>Item Code</th>
                    <th>Description</th>
                    <th>Product Type</th>
                    <th>Grade</th>
                    <th>Connection</th>
                    <th>Size (OD)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in displayedInventory" :key="item.id">
                    <td>{{ item.code }}</td>
                    <td>{{ item.item_id }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.qty_unit }}</td>
                    <td>{{ item.country_name }}</td>
                    <td>{{ item.itemCode }}</td>
                    <td>{{ item.itemDesc }}</td>
                    <td>{{ item.productType }}</td>
                    <td>{{ item.grade }}</td>
                    <td>{{ item.connection }}</td>
                    <td>{{ item.size }}</td>
                </tr>
                <tr v-if="!displayedInventory.length">
                    <td colspan="11" class="no-data">No data available</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        displayedInventory: {
        type: Array,
        required: true,
        },
    },
};
</script>

<style scoped>
    .table-container {
        overflow-x: auto;
        margin-top: 20px;
    }
    
    .responsive-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    thead {
        background-color: #007bff;
        color: white;
    }
    
    th, td {
        padding: 12px 15px;
        border: 1px solid #ddd;
    }
    
    .no-data {
        text-align: center;
        font-style: italic;
        color: #888;
    }
</style>