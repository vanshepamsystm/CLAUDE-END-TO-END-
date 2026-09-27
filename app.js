(function () {
  'use strict';

  var STORAGE_KEY = 'todo.tasks.v1';

  // --- Persistence Layer (architecture.md §10) ---

  function isValidTaskArray(value) {
    if (!Array.isArray(value)) {
      return false;
    }
    for (var i = 0; i < value.length; i++) {
      var task = value[i];
      if (!task || typeof task !== 'object') {
        return false;
      }
      if (typeof task.id !== 'string') {
        return false;
      }
      if (typeof task.title !== 'string') {
        return false;
      }
      if (typeof task.completed !== 'boolean') {
        return false;
      }
    }
    return true;
  }

  function load() {
    var raw;
    try {
      raw = window.localStorage.getItem(STORAGE_KEY);
    } catch (readError) {
      return { status: 'unavailable', tasks: [] };
    }

    if (raw === null) {
      return { status: 'ok', tasks: [] };
    }

    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseError) {
      return { status: 'malformed', tasks: [] };
    }

    if (!isValidTaskArray(parsed)) {
      return { status: 'malformed', tasks: [] };
    }

    return { status: 'ok', tasks: parsed };
  }

  function save(tasksToSave) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksToSave));
      return { status: 'ok' };
    } catch (writeError) {
      return { status: 'failed' };
    }
  }

  // --- Task Store (architecture.md §7, §9) ---

  var tasks = [];
  var persistenceStatus = 'ok';
  var idCounter = 0;

  function generateId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    idCounter += 1;
    return Date.now().toString(36) + '-' + idCounter.toString(36) + '-' + Math.random().toString(36).slice(2);
  }

  function initStore() {
    var result = load();
    tasks = result.tasks;
    persistenceStatus = result.status;
  }

  function persistAfterMutation() {
    var result = save(tasks);
    persistenceStatus = result.status;
  }

  function createTask(rawTitle) {
    if (typeof rawTitle !== 'string' || rawTitle.trim().length === 0) {
      return null;
    }
    var task = { id: generateId(), title: rawTitle, completed: false };
    tasks.unshift(task);
    persistAfterMutation();
    return task;
  }

  function findTask(id) {
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        return tasks[i];
      }
    }
    return null;
  }

  function setCompleted(id, completed) {
    var task = findTask(id);
    if (!task) {
      return;
    }
    task.completed = completed;
    persistAfterMutation();
  }

  function deleteTask(id) {
    var index = -1;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return;
    }
    tasks.splice(index, 1);
    persistAfterMutation();
  }

  // --- UI Layer (architecture.md §7, §12, §13) ---

  var formEl;
  var titleInput;
  var taskListEl;
  var noticeEl;

  var NOTICE_MESSAGES = {
    unavailable: 'Storage is unavailable in this browser — your changes will not be saved.',
    malformed: 'Previously saved tasks could not be loaded. The saved data was left unchanged.',
    failed: 'Your last change could not be saved.'
  };

  function renderNotice() {
    var message = NOTICE_MESSAGES[persistenceStatus];
    if (!message) {
      noticeEl.hidden = true;
      noticeEl.textContent = '';
      return;
    }
    noticeEl.hidden = false;
    noticeEl.textContent = message;
  }

  function buildTaskItem(task) {
    var li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute(
      'aria-label',
      (task.completed ? 'Mark as incomplete: ' : 'Mark as complete: ') + task.title
    );
    checkbox.addEventListener('change', function () {
      setCompleted(task.id, checkbox.checked);
      renderAll();
    });

    var titleSpan = document.createElement('span');
    titleSpan.className = 'title';
    titleSpan.textContent = task.title;

    var deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', 'Delete: ' + task.title);
    deleteButton.addEventListener('click', function () {
      deleteTask(task.id);
      renderAll();
      titleInput.focus();
    });

    li.appendChild(checkbox);
    li.appendChild(titleSpan);
    li.appendChild(deleteButton);
    return li;
  }

  function renderTasks() {
    taskListEl.textContent = '';
    for (var i = 0; i < tasks.length; i++) {
      taskListEl.appendChild(buildTaskItem(tasks[i]));
    }
  }

  function renderAll() {
    renderTasks();
    renderNotice();
  }

  function handleCreateSubmit(event) {
    event.preventDefault();
    var created = createTask(titleInput.value);
    if (created) {
      titleInput.value = '';
    }
    renderAll();
    titleInput.focus();
  }

  function initUI() {
    formEl = document.getElementById('create-form');
    titleInput = document.getElementById('title-input');
    taskListEl = document.getElementById('task-list');
    noticeEl = document.getElementById('notice');

    formEl.addEventListener('submit', handleCreateSubmit);

    renderAll();
  }

  function init() {
    initStore();
    initUI();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
