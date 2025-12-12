// Access verification script
(function() {
    // Check if all required access fields exist and have values
    const requiredFields = [
        'accessGranted',
        'accessKey', 
        'accessTime',
        'userGmail',
        'userName',
        'verificationCode'
    ];
    
    let hasValidAccess = true;
    
    // Check each required field
    for (const field of requiredFields) {
        const value = localStorage.getItem(field);
        
        // If any field is missing, empty, or invalid
        if (!value || value.trim() === '' || value === 'null' || value === 'undefined') {
            hasValidAccess = false;
            break;
        }
    }
    
    // Special check for accessGranted must be exactly "true"
    if (localStorage.getItem('accessGranted') !== 'true') {
        hasValidAccess = false;
    }
    
    // Redirect to login if access is invalid
    if (!hasValidAccess) {
        window.location.href = 'log.html';
    }
})();

// Function to handle fullscreen changes and maintain overlay
function setupOverlayProtection() {
    // Disable right-click context menu on the overlay
    const overlay = document.getElementById('iframe-overlay');
    if (overlay) {
        overlay.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    }
    
    // Monitor for fullscreen changes
    document.addEventListener('fullscreenchange', updateOverlayPosition);
    document.addEventListener('webkitfullscreenchange', updateOverlayPosition);
    document.addEventListener('mozfullscreenchange', updateOverlayPosition);
    document.addEventListener('MSFullscreenChange', updateOverlayPosition);
}

function updateOverlayPosition() {
    const overlay = document.getElementById('iframe-overlay');
    if (!overlay) return;
    
    const playerElement = document.querySelector('.plyr');
    
    if (playerElement && playerElement.classList.contains('plyr--fullscreen-active')) {
        // In fullscreen - make overlay cover entire screen
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.zIndex = '9999';
    } else {
        // Not in fullscreen - reset to container
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '10';
    }
}

// DOM Elements
const subjectsList = document.getElementById('subjects-list');
const videoFrame = document.getElementById('lecture-video');
const lectureNameElement = document.getElementById('lecture-name');
const videoPlaceholder = document.getElementById('video-placeholder');
const playerContainer = document.getElementById('player');

// Track currently active lecture
let activeLecture = null;
let player = null;
let isPlayerLoading = false;
let pendingVideoRequest = null;

// Completion tracking variables
let completedLectures = JSON.parse(localStorage.getItem('completedLectures')) || [];
let currentVideoId = null;
let currentLectureElement = null;

// Mobile touch controls variables
let touchControlsTimeout;
let isTouchDevice = false;
let isControlsVisible = true;

// Search functionality variables
let searchTimeout = null;
let currentSearchResults = [];

// Function to detect touch device
function detectTouchDevice() {
    return (('ontouchstart' in window) || 
            (navigator.maxTouchPoints > 0) || 
            (navigator.msMaxTouchPoints > 0) ||
            (window.DocumentTouch && document instanceof DocumentTouch));
}

// Function to show controls
function showTouchControls() {
    if (!isTouchDevice || !player) return;
    
    const controls = document.querySelector('.plyr--touch .plyr__controls');
    if (controls) {
        controls.classList.remove('hidden');
        isControlsVisible = true;
    }
    
    // Clear existing timeout
    if (touchControlsTimeout) {
        clearTimeout(touchControlsTimeout);
    }
    
    // Set timeout to hide controls after 3 seconds of inactivity
    touchControlsTimeout = setTimeout(() => {
        if (!player.paused) {
            hideTouchControls();
        }
    }, 3000);
}

// Function to hide controls
function hideTouchControls() {
    if (!isTouchDevice || !player) return;
    
    const controls = document.querySelector('.plyr--touch .plyr__controls');
    if (controls && isControlsVisible) {
        controls.classList.add('hidden');
        isControlsVisible = false;
    }
}

// Function to toggle controls
function toggleTouchControls() {
    if (!isTouchDevice || !player) return;
    
    if (isControlsVisible) {
        hideTouchControls();
    } else {
        showTouchControls();
    }
}

// Reset controls timeout on any interaction
function resetControlsTimeout() {
    if (!isTouchDevice || !player) return;
    showTouchControls();
}

// Initialize mobile touch controls
function initializeTouchControls() {
    isTouchDevice = detectTouchDevice();
    
    if (isTouchDevice) {
        console.log('Touch device detected - initializing touch controls');
        
        // Add touch class to player
        const playerElement = document.querySelector('.plyr');
        if (playerElement) {
            playerElement.classList.add('plyr--touch');
        }
        
        // Create touch overlay if it doesn't exist
        let touchOverlay = document.getElementById('touch-overlay');
        if (!touchOverlay) {
            touchOverlay = document.createElement('div');
            touchOverlay.className = 'touch-overlay';
            touchOverlay.id = 'touch-overlay';
            document.querySelector('.video-container').appendChild(touchOverlay);
        }
        
        // Add event listeners for touch overlay
        touchOverlay.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTouchControls();
        });

        // Add touch events to video container for better control
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.addEventListener('touchstart', (e) => {
                if (!e.target.closest('.plyr__controls')) {
                    resetControlsTimeout();
                }
            });
        }
        
        // Add event listeners to show controls on any player interaction
        if (player) {
            player.on('play', showTouchControls);
            player.on('pause', showTouchControls);
            player.on('controlsshown', resetControlsTimeout);
        }
        
        // Hide controls initially after 3 seconds
        touchControlsTimeout = setTimeout(hideTouchControls, 3000);
    }
}

// Initialize the page
function initializePage() {
    // Initialize new lecture tracking FIRST
    initializeNewLectureTracking();
    
    // Populate subjects list
    populateSubjects();
    
    // Initialize completion status
    initializeCompletionStatus();
    
    // Initialize search functionality
    initializeSearch();
    
    // Setup overlay protection
    setupOverlayProtection();
    
    // Add resize listener for overlay updates
    window.addEventListener('resize', updateOverlayPosition);
    
    // Detect touch device early
    isTouchDevice = detectTouchDevice();
    
    // Initialize completion button events
    initializeCompletionEvents();
}

// Initialize search functionality
function initializeSearch() {
    const searchBox = document.getElementById('search-box');
    const searchResults = document.getElementById('search-results');
    const clearSearchBtn = document.getElementById('clear-search');

    // Search input event with debouncing
    searchBox.addEventListener('input', function(e) {
        const searchTerm = e.target.value.trim();
        
        // Show/hide clear button based on search term
        if (searchTerm !== '') {
            clearSearchBtn.style.display = 'flex';
        } else {
            clearSearchBtn.style.display = 'none';
        }
        
        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // Set timeout for search execution
        searchTimeout = setTimeout(() => {
            performSearch(searchTerm);
        }, 300);
    });
    
    // Clear search button event
    clearSearchBtn.addEventListener('click', function() {
        clearSearch();
    });
    
    // Handle search box focus - show results if there's text
    searchBox.addEventListener('focus', function() {
        const searchTerm = this.value.trim();
        if (searchTerm !== '' && currentSearchResults.length > 0) {
            showSearchResults();
        }
    });
    
    // Handle clicks outside search to close results
    document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target) && !searchResults.contains(e.target) && !clearSearchBtn.contains(e.target)) {
            hideSearchResults();
        }
    });
    
    // Handle escape key to clear search
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (searchBox.value.trim() !== '') {
                clearSearch();
            } else {
                hideSearchResults();
                searchBox.blur();
            }
        }
    });
}

// Clear search function
function clearSearch() {
    const searchBox = document.getElementById('search-box');
    const clearSearchBtn = document.getElementById('clear-search');
    const searchResults = document.getElementById('search-results');
    
    // Clear search box
    searchBox.value = '';
    
    // Hide clear button
    clearSearchBtn.style.display = 'none';
    
    // Clear search results
    hideSearchResults();
    
    // Clear search data
    currentSearchResults = [];
    
    // Focus back on search box
    searchBox.focus();
    
    // Add subtle animation to clear button
    clearSearchBtn.style.transform = 'scale(0.8)';
    setTimeout(() => {
        clearSearchBtn.style.transform = 'scale(1)';
    }, 150);
}

// Advanced search function with fuzzy matching
function performSearch(searchTerm) {
    const searchResults = document.getElementById('search-results');
    const subjectsList = document.getElementById('subjects-list');
    
    if (!searchTerm) {
        hideSearchResults();
        subjectsList.style.display = 'flex';
        return;
    }
    
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const results = [];
    
    // Search through all lectures with advanced matching
    subjectsData.forEach(subject => {
        subject.lectures.forEach((lecture, index) => {
            const lectureTitle = lecture.title.toLowerCase();
            const subjectName = subject.name.toLowerCase();
            
            // Advanced matching criteria
            const matches = calculateMatchScore(lectureTitle, subjectName, normalizedSearch);
            
            if (matches.score > 0) {
                results.push({
                    subject: subject.name,
                    subjectColor: subject.color,
                    subjectIcon: subject.icon,
                    lecture: lecture,
                    lectureIndex: index,
                    matchScore: matches.score,
                    matchType: matches.type
                });
            }
        });
    });
    
    // Sort by match score (highest first)
    results.sort((a, b) => b.matchScore - a.matchScore);
    
    currentSearchResults = results;
    displaySearchResults(results);
}

// Advanced matching algorithm
function calculateMatchScore(lectureTitle, subjectName, searchTerm) {
    let score = 0;
    let type = 'partial';
    
    // Exact match (highest priority)
    if (lectureTitle === searchTerm || subjectName === searchTerm) {
        score = 100;
        type = 'exact';
    }
    // Starts with search term
    else if (lectureTitle.startsWith(searchTerm) || subjectName.startsWith(searchTerm)) {
        score = 90;
        type = 'starts-with';
    }
    // Contains search term as whole word
    else if (lectureTitle.includes(` ${searchTerm} `) || lectureTitle.endsWith(` ${searchTerm}`)) {
        score = 80;
        type = 'whole-word';
    }
    // Contains search term anywhere
    else if (lectureTitle.includes(searchTerm) || subjectName.includes(searchTerm)) {
        score = 70;
        type = 'contains';
    }
    // Fuzzy matching for Bangla/English variations
    else {
        const fuzzyScore = calculateFuzzyScore(lectureTitle + ' ' + subjectName, searchTerm);
        if (fuzzyScore > 0.6) {
            score = Math.floor(fuzzyScore * 60);
            type = 'fuzzy';
        }
    }
    
    // Bonus for subject name matches
    if (subjectName.includes(searchTerm)) {
        score += 10;
    }
    
    return { score, type };
}

// Fuzzy matching algorithm
function calculateFuzzyScore(text, searchTerm) {
    if (searchTerm.length === 0) return 1;
    if (searchTerm.length > text.length) return 0;
    
    let runningScore = 0;
    let searchIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
        if (text[i] === searchTerm[searchIndex]) {
            runningScore += 1;
            searchIndex++;
            
            if (searchIndex === searchTerm.length) break;
        }
    }
    
    return runningScore / searchTerm.length;
}

// Display search results in the subjects list area
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    const subjectsList = document.getElementById('subjects-list');
    
    // Hide the normal subjects list
    subjectsList.style.display = 'none';
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <div>No lectures found matching your search</div>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.map((result, index) => {
            const isCompleted = completedLectures.includes(result.lecture.videoId);
            const completedClass = isCompleted ? 'completed' : '';
            
            return `
                <div class="search-result-item ${completedClass}" 
                     data-subject="${result.subject}" 
                     data-lecture-index="${result.lectureIndex}"
                     data-video-id="${result.lecture.videoId}"
                     data-result-index="${index}">
                    <div class="search-result-header">
                        <i class="search-result-icon ${result.subjectIcon}" style="color: ${result.subjectColor};"></i>
                        <div class="search-result-content">
                            <div class="search-result-title">${result.lecture.title}</div>
                            <div class="search-result-subject">${result.subject}</div>
                        </div>
                        ${isCompleted ? '<span class="completion-status"><i class="fas fa-check"></i></span>' : ''}
                    </div>
                </div>
            `;
        }).join('');
        
        // Add click events to search results
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', handleSearchResultClick);
        });
    }
    
    showSearchResults();
    
    // Add animation to results
    searchResults.style.animation = 'fadeIn 0.4s ease';
}

// Show search results
function showSearchResults() {
    const searchResults = document.getElementById('search-results');
    searchResults.classList.add('active');
}

// Hide search results and show normal subjects list
function hideSearchResults() {
    const searchResults = document.getElementById('search-results');
    const subjectsList = document.getElementById('subjects-list');
    const searchBox = document.getElementById('search-box');
    const clearSearchBtn = document.getElementById('clear-search');
    
    searchResults.classList.remove('active');
    subjectsList.style.display = 'flex';
    
    // Clear search box and hide clear button if we're hiding results
    if (!searchBox.matches(':focus')) {
        searchBox.value = '';
        clearSearchBtn.style.display = 'none';
        currentSearchResults = [];
    }
}

// Handle search result click
function handleSearchResultClick(e) {
    const resultItem = e.currentTarget;
    const subject = resultItem.dataset.subject;
    const lectureIndex = parseInt(resultItem.dataset.lectureIndex);
    const videoId = resultItem.dataset.videoId;
    const resultIndex = parseInt(resultItem.dataset.resultIndex);
    
    // Find the lecture data
    const lectureData = currentSearchResults[resultIndex].lecture;
    
    // Load the video
    loadVideo(videoId, lectureData.title, subject);
    
    // Update active states
    setActiveSearchResult(resultItem);
    
    // Add selection animation
    resultItem.style.animation = 'scaleIn 0.3s ease';
    setTimeout(() => {
        resultItem.style.animation = '';
    }, 300);
    
    // Scroll to top on mobile
    if (window.innerWidth <= 992) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Set active search result
function setActiveSearchResult(selectedItem) {
    // Remove active class from all search results
    document.querySelectorAll('.search-result-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Also remove active class from all lecture items in subjects list
    document.querySelectorAll('.lecture-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected search result
    selectedItem.classList.add('active');
}

// Helper function to get subject name by video ID
function getSubjectNameByVideoId(videoId) {
    for (const subject of subjectsData) {
        const lecture = subject.lectures.find(lect => lect.videoId === videoId);
        if (lecture) {
            return subject.name;
        }
    }
    return '';
}

// Function to update video subject info in the header
function updateVideoSubjectInfo(subjectName, lectureTitle) {
    const subjectIcon = document.getElementById('video-subject-icon');
    const subjectNameElement = document.getElementById('video-subject-name');
    
    // Find the subject data
    const subjectData = subjectsData.find(subject => subject.name === subjectName);
    
    if (subjectData) {
        // Set subject icon and color
        subjectIcon.className = `video-subject-icon ${subjectData.icon}`;
        subjectIcon.style.color = subjectData.color;
        
        // Set subject name
        subjectNameElement.textContent = subjectName;
        
        // Show the subject info
        subjectIcon.style.display = 'block';
        subjectNameElement.style.display = 'block';
    } else {
        // Hide subject info if not found
        subjectIcon.style.display = 'none';
        subjectNameElement.style.display = 'none';
    }
}

// Completion tracking functions
function updateCompletionButton(videoId) {
    const completionBtn = document.getElementById('completion-btn');
    const btnIcon = completionBtn.querySelector('i');
    
    const isCompleted = completedLectures.includes(videoId);
    
    if (isCompleted) {
        completionBtn.classList.add('completed');
        btnIcon.className = 'fas fa-check-circle';
        completionBtn.title = 'Mark as not completed';
    } else {
        completionBtn.classList.remove('completed');
        btnIcon.className = 'far fa-check-circle';
        completionBtn.title = 'Mark as completed';
    }
    
    completionBtn.style.display = 'block';
    
    // Add subtle animation when updating
    completionBtn.style.animation = 'none';
    setTimeout(() => {
        completionBtn.style.animation = 'scaleIn 0.3s ease';
    }, 10);
}

function updateLectureCompletionStatus(subjectName, lectureIndex, videoId) {
    const lectureItem = document.querySelector(`.lecture-item[data-subject="${subjectName}"][data-lecture-index="${lectureIndex}"]`);
    
    if (lectureItem) {
        const isCompleted = completedLectures.includes(videoId);
        
        if (isCompleted) {
            lectureItem.classList.add('completed');
            // Add completion status icon if not exists
            if (!lectureItem.querySelector('.completion-status')) {
                const statusIcon = document.createElement('span');
                statusIcon.className = 'completion-status';
                statusIcon.innerHTML = '<i class="fas fa-check"></i>';
                lectureItem.appendChild(statusIcon);
            }
        } else {
            lectureItem.classList.remove('completed');
            const statusIcon = lectureItem.querySelector('.completion-status');
            if (statusIcon) {
                statusIcon.remove();
            }
        }
    }
}

function showConfirmationModal(isCompleting) {
    const modal = document.getElementById('confirmation-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    
    if (isCompleting) {
        modalTitle.textContent = 'Mark as Completed';
        modalMessage.textContent = 'Do you want to mark this lecture as completed?';
    } else {
        modalTitle.textContent = 'Unmark Completion';
        modalMessage.textContent = 'Do you want to unmark this lecture as completed?';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function toggleLectureCompletion() {
    if (!currentVideoId || !activeLecture) return;
    
    const isCurrentlyCompleted = completedLectures.includes(currentVideoId);
    
    if (!isCurrentlyCompleted) {
        // Mark as completed
        completedLectures.push(currentVideoId);
        localStorage.setItem('completedLectures', JSON.stringify(completedLectures));
        
        // Update UI
        updateCompletionButton(currentVideoId);
        updateLectureCompletionStatus(activeLecture.subject, activeLecture.index, currentVideoId);
        
        // Show success feedback
        showCompletionFeedback(true);
    } else {
        // Unmark completion
        completedLectures = completedLectures.filter(id => id !== currentVideoId);
        localStorage.setItem('completedLectures', JSON.stringify(completedLectures));
        
        // Update UI
        updateCompletionButton(currentVideoId);
        updateLectureCompletionStatus(activeLecture.subject, activeLecture.index, currentVideoId);
        
        // Show feedback
        showCompletionFeedback(false);
    }
}

function showCompletionFeedback(isCompleted) {
    const completionBtn = document.getElementById('completion-btn');
    
    // Clean button animation only
    completionBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        completionBtn.style.transform = 'scale(1)';
    }, 300);
}

// Initialize completion status for all lectures
function initializeCompletionStatus() {
    subjectsData.forEach(subject => {
        subject.lectures.forEach((lecture, index) => {
            updateLectureCompletionStatus(subject.name, index, lecture.videoId);
        });
    });
}

// Initialize completion button events
function initializeCompletionEvents() {
    // Completion button event listener
    document.getElementById('completion-btn').addEventListener('click', function() {
        const isCurrentlyCompleted = completedLectures.includes(currentVideoId);
        showConfirmationModal(!isCurrentlyCompleted);
    });

    // Modal event listeners
    document.getElementById('modal-proceed').addEventListener('click', function() {
        document.getElementById('confirmation-modal').classList.remove('active');
        document.body.style.overflow = '';
        toggleLectureCompletion();
    });

    document.getElementById('modal-cancel').addEventListener('click', function() {
        document.getElementById('confirmation-modal').classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    document.getElementById('confirmation-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Populate subjects list with badges
function populateSubjects() {
    subjectsList.innerHTML = ''; // Clear existing content
    
    // Filter out subjects without lectures
    subjectsData.filter(subject => subject.lectures && subject.lectures.length > 0).forEach(subject => {
        const subjectItem = document.createElement('div');
        subjectItem.className = 'subject-item';
        
        const subjectHeader = document.createElement('div');
        subjectHeader.className = 'subject-header';
        subjectHeader.setAttribute('data-subject-name', subject.name);
        subjectHeader.innerHTML = `
            <i class="subject-icon ${subject.icon}" style="color: ${subject.color};"></i>
            <span class="subject-title">${subject.name}</span>
            <i class="dropdown-icon fas fa-chevron-down"></i>
        `;
        
        const lecturesList = document.createElement('div');
        lecturesList.className = 'lectures-list';
        
        subject.lectures.forEach((lecture, index) => {
            const lectureItem = document.createElement('div');
            lectureItem.className = 'lecture-item';
            lectureItem.dataset.subject = subject.name;
            lectureItem.dataset.lectureIndex = index;
            
            lectureItem.innerHTML = `
                <i class="lecture-icon fas fa-play-circle" style="color: ${subject.color};"></i>
                <span class="lecture-title">${lecture.title}</span>
                <div class="lecture-badges">
                </div>
            `;
            
// Add click event to load video
lectureItem.addEventListener('click', () => {
    loadVideo(lecture.videoId, lecture.title, subject.name);
    
    // Set active lecture
    setActiveLecture(lectureItem, subject.name, index);
    
    // Add animation effect
    lectureItem.style.animation = 'scaleIn 0.3s ease';
    setTimeout(() => {
        lectureItem.style.animation = '';
    }, 300);
    
    // Scroll to top on mobile
    if (window.innerWidth <= 992) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});
            
            lecturesList.appendChild(lectureItem);
        });
        
        // Toggle lectures list on subject header click
        subjectHeader.addEventListener('click', () => {
            const isOpen = lecturesList.classList.contains('open');
            
            // Close all other open subjects immediately
            document.querySelectorAll('.lectures-list.open').forEach(list => {
                if (list !== lecturesList) {
                    list.classList.remove('open');
                    const header = list.previousElementSibling;
                    header.querySelector('.dropdown-icon').className = 'dropdown-icon fas fa-chevron-down';
                }
            });
            
            // Toggle current subject
            if (isOpen) {
                lecturesList.classList.remove('open');
                subjectHeader.querySelector('.dropdown-icon').className = 'dropdown-icon fas fa-chevron-down';
            } else {
                lecturesList.classList.add('open');
                subjectHeader.querySelector('.dropdown-icon').className = 'dropdown-icon fas fa-chevron-up';
            }
        });
        
        subjectItem.appendChild(subjectHeader);
        subjectItem.appendChild(lecturesList);
        subjectsList.appendChild(subjectItem);
    });
}

// Load video into iframe - UPDATED with subject info
function loadVideo(videoId, lectureTitle, subjectName = '') {
    // If player is currently loading, queue this request
    if (isPlayerLoading) {
        pendingVideoRequest = { videoId, lectureTitle, subjectName };
        return;
    }
    
    console.log('Loading video:', videoId, lectureTitle);
    
    // Scroll to top of page on mobile when video is selected
    if (window.innerWidth <= 992) { // Mobile/tablet breakpoint
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Set loading state
    isPlayerLoading = true;
    
    // Update UI to show loading state
    lectureNameElement.textContent = `${lectureTitle}`;
    videoPlaceholder.style.display = 'none';
    playerContainer.style.display = 'block';
    
    // Show loading indicator
    showLoadingIndicator();
    
    // Destroy existing Plyr instance
    if (player) {
        player.destroy();
        player = null;
    }
    
    // Create a completely fresh iframe element
    const newIframe = document.createElement('iframe');
    newIframe.id = 'lecture-video';
    newIframe.className = 'plyr__video-embed';
    newIframe.src = `https://www.youtube.com/embed/${videoId}?origin=https://plyr.io&enablejsapi=1&widgetid=1`;
    newIframe.frameBorder = '0';
    newIframe.allowFullscreen = true;
    newIframe.allow = 'autoplay';
    newIframe.style.pointerEvents = 'none'; // CRITICAL: Always prevent iframe interaction
    
    // Replace the iframe
    const oldIframe = document.getElementById('lecture-video');
    oldIframe.parentNode.replaceChild(newIframe, oldIframe);
    
    // Update completion tracking
    currentVideoId = videoId;
    updateCompletionButton(videoId);
    
    // Update subject info in video header
    if (!subjectName) {
        subjectName = getSubjectNameByVideoId(videoId);
    }
    updateVideoSubjectInfo(subjectName, lectureTitle);
    
    // Add animation effect
    const videoInfo = document.querySelector('.video-info');
    videoInfo.style.animation = 'slideIn 0.5s ease';
    setTimeout(() => {
        videoInfo.style.animation = '';
    }, 500);
    
    // Reinitialize Plyr with skip buttons
    setTimeout(() => {
        try {
            player = new Plyr('#player', {
                controls: [
                    'play-large',
                    'rewind',
                    'play',
                    'fast-forward',
                    'progress',
                    'current-time',
                    'mute',
                    'volume',
                    'settings',
                    'pip',
                    'fullscreen'
                ],
                hideControls: false,
                clickToPlay: false,
                // Add touch-specific settings
                touch: true,
                hideControls: true,
                youtube: {
                    noCookie: true,
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    modestbranding: 1
                },
                i18n: {
                    rewind: 'Rewind {seektime}s',
                    fastForward: 'Forward {seektime}s'
                },
                seekTime: 10,
                // Prevent fullscreen issues on mobile
                fullscreen: {
                    enabled: true,
                    fallback: true,
                    iosNative: false,
                    container: null
                }
            });
            
            // Add play/pause event listeners for overlay control
            player.on('play', () => {
                console.log('Video playing - enabling overlay protection');
                const overlay = document.getElementById('iframe-overlay');
                const iframe = document.getElementById('lecture-video');
                if (overlay) {
                    overlay.style.pointerEvents = 'auto';
                }
                if (iframe) {
                    iframe.style.pointerEvents = 'none';
                }
                
                // Show controls when playing, then auto-hide
                showTouchControls();
            });

            player.on('pause', () => {
                console.log('Video paused - disabling overlay protection');
                const overlay = document.getElementById('iframe-overlay');
                const iframe = document.getElementById('lecture-video');
                if (overlay) {
                    overlay.style.pointerEvents = 'auto';
                }
                if (iframe) {
                    iframe.style.pointerEvents = 'none';
                }
                
                // Keep controls visible when paused
                showTouchControls();
                // Clear auto-hide timeout when paused
                if (touchControlsTimeout) {
                    clearTimeout(touchControlsTimeout);
                }
            });
            
            // Add more event listeners for better touch control
            player.on('controlsshown', () => {
                resetControlsTimeout();
            });

            player.on('controlshidden', () => {
                // Don't immediately hide, let timeout handle it
            });
            
            // When player is ready, clear loading state
            player.on('ready', () => {
                console.log('Player ready');
                isPlayerLoading = false;
                hideLoadingIndicator();
                lectureNameElement.textContent = lectureTitle;
                
                // ALWAYS BLOCK INTERACTION WITH YOUTUBE CONTROLS
                const overlay = document.getElementById('iframe-overlay');
                const iframe = document.getElementById('lecture-video');
                if (overlay) {
                    overlay.style.pointerEvents = 'auto';
                }
                if (iframe) {
                    iframe.style.pointerEvents = 'none';
                }
                
                // Update overlay protection for the new video
                updateOverlayPosition();
                
                // Initialize touch controls for mobile
                initializeTouchControls();
                
                // Process any pending video request
                if (pendingVideoRequest) {
                    const nextVideo = pendingVideoRequest;
                    pendingVideoRequest = null;
                    setTimeout(() => {
                        loadVideo(nextVideo.videoId, nextVideo.lectureTitle, nextVideo.subjectName);
                    }, 500);
                }
            });
            
            // Handle player load errors
            player.on('loaderror', () => {
                console.error('Player load error');
                isPlayerLoading = false;
                hideLoadingIndicator();
                lectureNameElement.textContent = 'Error loading video';
            });
            
            // Handle fullscreen changes to prevent auto-rotate on mobile
            player.on('enterfullscreen', () => {
                console.log('Entered fullscreen - updating overlay');
                updateOverlayPosition();
                
                // Re-initialize touch controls in fullscreen
                if (isTouchDevice) {
                    setTimeout(initializeTouchControls, 100);
                }
                
                // Lock orientation to landscape when entering fullscreen
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(() => {
                        // Ignore errors if orientation lock is not supported
                    });
                }
            });
            
            player.on('exitfullscreen', () => {
                console.log('Exited fullscreen - updating overlay');
                updateOverlayPosition();
                
                // Re-initialize touch controls after exiting fullscreen
                if (isTouchDevice) {
                    setTimeout(initializeTouchControls, 100);
                }
                
                // Unlock orientation when exiting fullscreen
                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                }
            });
            
        } catch (error) {
            console.error('Player initialization error:', error);
            isPlayerLoading = false;
            hideLoadingIndicator();
            lectureNameElement.textContent = 'Error initializing player';
        }
    }, 800);
}

// Loading indicator functions
function showLoadingIndicator() {
    let loadingEl = document.getElementById('video-loading');
    if (!loadingEl) {
        loadingEl = document.createElement('div');
        loadingEl.id = 'video-loading';
        loadingEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i><p>Loading video...</p>';
        loadingEl.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 10;
            color: white;
            font-size: 18px;
            background: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 10px;
        `;
        document.querySelector('.video-container').appendChild(loadingEl);
    }
    loadingEl.style.display = 'block';
}

function hideLoadingIndicator() {
    const loadingEl = document.getElementById('video-loading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
}

// Set active lecture
function setActiveLecture(lectureElement, subjectName, lectureIndex) {
    // Remove active class from all lectures
    document.querySelectorAll('.lecture-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked lecture
    lectureElement.classList.add('active');
    
    // Update active lecture tracking
    activeLecture = {
        element: lectureElement,
        subject: subjectName,
        index: lectureIndex
    };
    
    // Store current lecture element for completion tracking
    currentLectureElement = lectureElement;
}

// Initialize new lecture tracking
function initializeNewLectureTracking() {
    // Get watched lectures from localStorage
    let watchedLectures = JSON.parse(localStorage.getItem('watchedLectures')) || [];
    
    // Get all video IDs from current data
    const allVideoIds = [];
    subjectsData.forEach(subject => {
        subject.lectures.forEach(lecture => {
            allVideoIds.push(lecture.videoId);
        });
    });
    
    // Remove any watched lectures that no longer exist in current data
    watchedLectures = watchedLectures.filter(id => allVideoIds.includes(id));
    
    // Save back to localStorage
    localStorage.setItem('watchedLectures', JSON.stringify(watchedLectures));
}

// Check if a lecture is new (not watched)
function isLectureNew(videoId) {
    const watchedLectures = JSON.parse(localStorage.getItem('watchedLectures')) || [];
    return !watchedLectures.includes(videoId);
}

// Check if a subject has any new lectures
function checkSubjectHasNewLectures(subject) {
    const watchedLectures = JSON.parse(localStorage.getItem('watchedLectures')) || [];
    return subject.lectures.some(lecture => !watchedLectures.includes(lecture.videoId));
}

// Mark a lecture as watched
function markLectureAsWatched(videoId, subjectName, lectureIndex) {
    let watchedLectures = JSON.parse(localStorage.getItem('watchedLectures')) || [];
    
    if (!watchedLectures.includes(videoId)) {
        watchedLectures.push(videoId);
        localStorage.setItem('watchedLectures', JSON.stringify(watchedLectures));
        
        // Update the specific lecture badge
        updateLectureBadge(subjectName, lectureIndex);
        
        // Update the subject badge if needed
        updateSubjectBadge(subjectName);
    }
}

// Update a specific lecture badge
function updateLectureBadge(subjectName, lectureIndex) {
    const lectureItem = document.querySelector(`.lecture-item[data-subject="${subjectName}"][data-lecture-index="${lectureIndex}"]`);
    if (lectureItem) {
        const newBadge = lectureItem.querySelector('.badge-new');
        if (newBadge) {
            newBadge.remove();
        }
    }
}

// Update a subject badge
function updateSubjectBadge(subjectName) {
    const subject = subjectsData.find(s => s.name === subjectName);
    if (subject) {
        const hasNewLectures = checkSubjectHasNewLectures(subject);
        const subjectHeader = document.querySelector(`.subject-header[data-subject-name="${subjectName}"]`);
        
        if (subjectHeader) {
            const badgeContainer = subjectHeader.querySelector('.badge-container');
            const existingBadge = subjectHeader.querySelector('.badge-new');
            
            if (hasNewLectures && !existingBadge) {
                // Add new badge if subject has new lectures but no badge
                const newBadge = document.createElement('span');
                newBadge.className = 'badge badge-new';
                newBadge.textContent = 'New';
                badgeContainer.appendChild(newBadge);
            } else if (!hasNewLectures && existingBadge) {
                // Remove new badge if subject has no new lectures but has badge
                existingBadge.remove();
            }
        }
    }
}

// Navigate to home page
function goToHome() {
    window.location.href = 'index.html';
}

// Global touch event listeners for better mobile experience
document.addEventListener('touchstart', (e) => {
    if (isTouchDevice) {
        // Reset controls timeout on any touch interaction with controls
        if (player && e.target.closest('.plyr__controls')) {
            resetControlsTimeout();
        }
    }
});

// Prevent default touch behaviors that might interfere
document.addEventListener('touchmove', (e) => {
    if (e.target.closest('.plyr__video-embed') || e.target.closest('.touch-overlay')) {
        e.preventDefault();
    }
}, { passive: false });

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    if (isTouchDevice && player) {
        // Re-initialize touch controls after orientation change
        setTimeout(initializeTouchControls, 300);
    }
});

// Add event listener for touch events on controls to reset timeout
document.addEventListener('touchstart', (e) => {
    if (isTouchDevice && player && e.target.closest('.plyr__controls')) {
        resetControlsTimeout();
    }
});

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);