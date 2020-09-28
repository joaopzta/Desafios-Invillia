package com.example.crud.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.crud.api.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

}
