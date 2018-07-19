package br.com.supero.taskList.controller;

import br.com.supero.taskList.exception.ResourceNotFoundException;
import br.com.supero.taskList.model.Task;
import br.com.supero.taskList.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/task-list")
public class TaskController {

    private static final String TASK = "Task";

    @Autowired
    TaskRepository taskRepository;

    // Buscar todas as taks
    @CrossOrigin
    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Criar uma nova task
    @CrossOrigin
    @PostMapping("/tasks")
    public Task createTask(@Valid @RequestBody Task task) {
        return taskRepository.save(task);
    }

    // Buscar uma task
    @CrossOrigin
    @GetMapping("/tasks/{id}")
    public Task getTaskById(@PathVariable(value = "id") Long taskId) {
        return taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException(TASK, "id", taskId));
    }

    // Atualizar uma task
    @CrossOrigin
    @PutMapping("/tasks/{id}")
    public Task updateTaks(@PathVariable(value = "id") Long taskId, @Valid @RequestBody Task taskDetails) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException(TASK, "id", taskId));
        task.setTitulo(taskDetails.getTitulo());
        task.setDescricao(taskDetails.getDescricao());
        task.setConcluido(taskDetails.isConcluido());
        Task updatedTask = taskRepository.save(task);
        return updatedTask;
    }

    // Deletar uma task
    @CrossOrigin
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable(value = "id") Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException(TASK, "id", taskId));
        taskRepository.delete(task);
        return ResponseEntity.ok().build();
    }

}
