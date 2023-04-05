const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed()  //deploys the todolist contract before running 
  })

  it('deploys successfully', async () => {
    const address = await this.todoList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })//The first test case checks if the contract was deployed successfully by 
  //asserting that the contract address is not equal to 0x0, an empty string, null or undefined.

  it('lists tasks', async () => {
    const taskCount = await this.todoList.taskCount()
    const task = await this.todoList.tasks(taskCount)
    assert.equal(task.id.toNumber(), taskCount.toNumber())
    assert.equal(task.content, 'Check out dappuniversity.com')
    assert.equal(task.completed, false)
    assert.equal(taskCount.toNumber(), 1)
  })
  //The second test case checks if the list tasks function of the contract is working
  // correctly by getting the total number of tasks, getting the last task and comparing it to the expected values.

  it('creates tasks', async () => {
    const result = await this.todoList.createTask('A new task')
    const taskCount = await this.todoList.taskCount()
    assert.equal(taskCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, 'A new task')
    assert.equal(event.completed, false)
  })
  //The third test case checks if the create task function of the contract is working correctly by 
  //creating a new task, getting the total number of tasks, and comparing it to the expected number of tasks. 
  //It also checks the emitted event values to make sure that they match the expected values.

  it('toggles task completion', async () => {
    const result = await this.todoList.toggleCompleted(1)
    const task = await this.todoList.tasks(1)
    assert.equal(task.completed, true)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
  })
  //The fourth test case checks if the toggle completed function of the contract is working correctly by toggling 
  //the completion status of the first task, getting the first task and comparing its completed status to the expected value. 
  //It also checks the emitted event values to make sure that they match the expected values.

})