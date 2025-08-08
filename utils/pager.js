/**
 * 分页工具模块
 * 提供分页相关的公共函数
 */

/**
 * 生成分页按钮数组
 * @param {number} currentPage - 当前页码
 * @param {number} totalPages - 总页数
 * @returns {Array} 分页按钮数组
 */
function generatePageNumbers(currentPage, totalPages) {
    var pages = [];
    var maxButtons = 5; // 最多显示5个页码按钮
    
    if (totalPages <= maxButtons) {
        // 总页数少于等于最大按钮数，显示所有页码
        for (var i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // 总页数大于最大按钮数，需要省略号
        if (currentPage <= 3) {
            // 当前页在前3页，显示前5页
            for (var i = 1; i <= 5; i++) {
                pages.push(i);
            }
            if (totalPages > 5) {
                pages.push('...');
                pages.push(totalPages);
            }
        } else if (currentPage >= totalPages - 2) {
            // 当前页在后3页，显示后5页
            pages.push(1);
            pages.push('...');
            for (var i = totalPages - 4; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // 当前页在中间，显示当前页前后各2页
            pages.push(1);
            pages.push('...');
            for (var i = currentPage - 2; i <= currentPage + 2; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        }
    }
    
    return pages;
}

/**
 * 创建分页对象
 * @param {number} currentPage - 当前页码
 * @param {number} pageSize - 每页显示条数
 * @param {number} totalCount - 总记录数
 * @returns {Object} 分页对象
 */
function createPager(currentPage, pageSize, totalCount) {
    var offset = (currentPage - 1) * pageSize;
    
    var pager = {
        currentPage: currentPage,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        startIndex: offset + 1,
        endIndex: Math.min(offset + pageSize, totalCount)
    };
    
    // 生成分页按钮数组
    pager.pages = generatePageNumbers(pager.currentPage, pager.totalPages);
    
    return pager;
}

module.exports = {
    generatePageNumbers: generatePageNumbers,
    createPager: createPager
};
