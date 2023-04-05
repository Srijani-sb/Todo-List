pragma solidity ^0.5.0; 

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  } 

  mapping(uint => Task) public tasks; //storing the tasks in hash table , uint maps to task object in struct

  event TaskCreated(
    uint id,
    string content,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  

  function createTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
    emit TaskCreated(taskCount, _content, false);
  }
  //createTask is a function that takes a string argument _content.
  // It creates a new task with the content _content and completion status set to false, 
  //and adds it to the tasks mapping with a new uint key. It then emits a TaskCreated 
  //event with the task's details.



  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }


  //toggleCompleted is a function that takes a uint argument _id.
  // It retrieves the task with the given _id from the tasks mapping and toggles its completion status.
  // It then updates the task in the tasks mapping with the new completion status, and emits a TaskCompleted 
  //event with the task's details.





}