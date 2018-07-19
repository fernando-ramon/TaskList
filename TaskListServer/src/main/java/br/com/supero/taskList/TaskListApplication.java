package br.com.supero.taskList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TaskListApplication  {

	public static void main(String[] args) {
		SpringApplication.run(TaskListApplication.class, args);
	}
}
